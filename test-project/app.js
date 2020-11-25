//init HTML elements
const photo = document.querySelector(".photo");
const btnCreater = document.querySelector(".creater");

const cardSect = document.querySelector(".card__section");

let openObg;
let globalCount = 0;

//Create card
function createCard() {
  const param = `card${globalCount}`;

  //Create card struct
  const card = document.createElement("div");
  card.className = "card";
  card.id = param;
  cardSect.append(card);

  //Create delete btn
  const cancelIcon = document.createElement("i");
  cancelIcon.className = "material-icons cancel";
  cancelIcon.id = param;
  cancelIcon.innerHTML = "cancel";
  card.append(cancelIcon);

  //Create FIO Field
  const mainInfo = document.createElement("div");
  mainInfo.className = "main-info";
  card.append(mainInfo);
  //Create img
  const mainImg = document.createElement("img");
  mainImg.className = "photo";
  mainImg.alt = "Photo";
  mainInfo.append(mainImg);
  const fioInfoField = document.createElement("div");
  fioInfoField.className = "fio-info";
  mainInfo.append(fioInfoField);
  //FIO
  const fioWrapper = document.createElement("div");
  fioWrapper.className = "fio-wrapper";
  fioInfoField.append(fioWrapper);
  const lastName = document.createElement("h3");
  const firstName = document.createElement("h3");
  lastName.className = "last-name";
  firstName.className = "first-name";
  fioWrapper.append(lastName);
  fioWrapper.append(firstName);

  //Create span text info
  const textInfo = document.createElement("span");
  textInfo.className = "text-info";
  textInfo.id = `${param}span`;
  textInfo.innerHTML = `Connecting Error`;
  card.append(textInfo);

  //Create info anchors
  const ulList = document.createElement("div");
  ulList.className = "link-list";
  card.append(ulList);
  const liClassText = [
    "mail_outline",
    "assignment",
    "location_on",
    "contact_phone",
  ];

  //init HTML info anchors elements
  const anchors = {
    anchorEmail: "",
    anchorBirthday: "",
    anchorAddress: "",
    anchorPhone: "",
  };

  for (let i = 0; i < 4; i++) {
    const count = document.createElement("i");
    count.className = `material-icons md-36 ${liClassText[i]}`;
    count.id = `${param}arch`;
    count.innerHTML = `${liClassText[i]}`;
    ulList.append(count);
    anchors[Object.keys(anchors)[i]] = count;
  }

  // openObg = {
  //   [param]: {
  //     cardSect: cardSect,
  //     cancelIcon: cancelIcon,

  //     mainImg: mainImg,
  //     lastName: lastName,
  //     firstName: firstName,
  //     anchorEmail: anchorEmail,
  //     anchorBirthday: anchorBirthday,
  //     anchorAddress: anchorAddress,
  //     anchorPhone: anchorPhone,
  //     textInfo: textInfo,
  //   },
  // };

  globalCount++;

  return {
    param: param,

    cardSect: cardSect,
    cancelIcon: cancelIcon,

    mainImg: mainImg,
    lastName: lastName,
    firstName: firstName,
    anchorEmail: anchors.anchorEmail,
    anchorBirthday: anchors.anchorBirthday,
    anchorAddress: anchors.anchorAddress,
    anchorPhone: anchors.anchorPhone,
    textInfo: textInfo,
  };
}

//Get info
async function getRandomApi(obj) {
  const url = `https://randomuser.me/api/`;
  const res = await fetch(url);
  const data = await res.json();

  obj.mainImg.src = `${data.results[0].picture.large}`;
  obj.lastName.innerHTML = `${data.results[0].name.last}`;
  obj.firstName.innerHTML = `${data.results[0].name.first}`;
  obj.textInfo.innerHTML = `${data.results[0].email}`;

  obj.cancelIcon.addEventListener("click", () => {
    let del = obj.cancelIcon.parentElement.id;
    const delDiv = document.getElementById(`${del}`);
    const param = obj.param;
    delDiv.remove();
    // delete openObg[del];
    // console.log(openObg);
  });

  obj.anchorEmail.addEventListener("mouseover", () => {
    let spanId = obj.anchorEmail.id;
    const spanElement = document.getElementById(`${spanId.slice(0, 5)}span`);
    spanElement.innerHTML = `${data.results[0].email}`;
  });

  obj.anchorBirthday.addEventListener("mouseover", () => {
    obj.textInfo.innerHTML = `Comming soon`;
  });

  obj.anchorAddress.addEventListener("mouseover", () => {
    let spanId = obj.anchorEmail.id;
    const spanElement = document.getElementById(`${spanId.slice(0, 5)}span`);
    spanElement.innerHTML = `${data.results[0].location.street.number} ${data.results[0].location.street.name}, ${data.results[0].location.city}, ${data.results[0].location.country}`;
  });

  obj.anchorPhone.addEventListener("mouseover", () => {
    let spanId = obj.anchorEmail.id;
    const spanElement = document.getElementById(`${spanId.slice(0, 5)}span`);
    spanElement.innerHTML = `${data.results[0].phone}`;
  });
}

btnCreater.addEventListener("click", () => {
  getRandomApi(createCard());
  // console.log(openObg);
  // let actualCounter = Object.keys(openObg)[globalCount];
  // console.log(openObg[actualCounter]);
});
