const FIELDS = {
    fieldName: "name",
    fileName: "name.json"
}

async function readData() {
  const data = await fetch(`./json_db/${FIELDS.fileName}`);
  const res = await data.json();
  return res;
}

async function loadDataInDOM() {
  const fullData = await readData();

  const mainList = document.createElement("ul");
  const list = [];

  for (let i = 0; i < fullData.length; i++) {
    list.push(document.createElement("li"));
    list[i].innerHTML = fullData[i][`${FIELDS.fieldName}`];
    mainList.append(list[i]);
  }

  document.body.append(mainList);
}

await loadDataInDOM();
