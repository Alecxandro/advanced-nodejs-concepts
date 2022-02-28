//console.log(await Promise.resolve(true));

import { readdir } from 'fs/promises';
import { createReadStream, createWriteStream} from 'fs'
import { dirname, join } from 'path';
import { promisify } from 'util';
import { pipeline, Transform } from 'stream';
import csvtojson from 'csvtojson';

const pipelineAsync = promisify(pipeline);

import debug from 'debug';


const log = debug('app:concat');

const { pathname: currentFile} = new URL(import.meta.url);

console.log(`this is the currentFile data: ${currentFile}`);

const cwd = dirname(currentFile);

const filesDir = `${cwd}/dataset`;
const output = `${cwd}/final.csv`;


console.time('concat-time')
const files = (await readdir(filesDir))
.filter(item => !(!!~item.indexOf('.zip')));

log(`processing ${files}`);

const ONE_SECOND = 1000;

setInterval(()=> process.stdout.write('.'), ONE_SECOND).unref();

const combinedStreams = createReadStream(join(filesDir, files[0]));
const finalStream = createWriteStream(output);
const handleStream = new Transform({
    transform: (chunk, encoding, cb) => {
        const data = JSON.parse(chunk);
        const output = {
            id: data.Respondent,
            country: data.Country
        }
        console.log(`id: ${output.id}`);
        return cb(null, JSON.stringify(output));
    }

})

await pipelineAsync (
    combinedStreams,
    csvtojson(),
    handleStream,
    finalStream
)

log(`${files.length} files merged on ${output}`);
console.timeEnd('concat-time')