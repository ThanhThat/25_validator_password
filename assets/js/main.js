const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const showPass = $(".show-password");
const password = $("#password");
const form = $("#form");

showPass.addEventListener("click", showHidePass);
password.addEventListener("input", checkPass);
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isSubmit = checkPass.call(password);

  if (isSubmit) {
    alert("Submit thành công!");

    password.value = "";
  }
});

function checkPass() {
  // Remove whitespace
  this.value = this.value.trim();

  // Check lower case
  const isLowerCase = lowerCase(this.value);
  updateUi($$(".icon")[0], $$(".text")[0], isLowerCase);

  // Check upper case
  const isUpperCase = upperCase(this.value);
  updateUi($$(".icon")[1], $$(".text")[1], isUpperCase);

  // checkNumber
  const isNumber = number(this.value);
  updateUi($$(".icon")[2], $$(".text")[2], isNumber);

  // check symbol
  const isSymbol = symbol(this.value);
  updateUi($$(".icon")[3], $$(".text")[3], isSymbol);

  // Check min length 8 character
  const isLength8 = minLength(this.value, 8);
  updateUi($$(".icon")[4], $$(".text")[4], isLength8);

  const isSubmit =
    isLength8 && isLowerCase && isNumber && isSymbol && isUpperCase;
  if (isSubmit) {
    return true;
  }

  return false;
}

function minLength(value, min) {
  const val = value;

  if (val.length >= min) {
    return true;
  }

  return false;
}

function symbol(value) {
  const val = value;

  for (let i in val) {
    const isSymbol =
      (val.charCodeAt(i) >= 33 && val.charCodeAt(i) <= 47) ||
      (val.charCodeAt(i) >= 58 && val.charCodeAt(i) <= 64);
    if (isSymbol) {
      return true;
    }
  }

  return false;
}

function number(value) {
  const val = value;
  const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i in val) {
    for (let j in arr) {
      if (val[i] === arr[j]) {
        return true;
      }
    }
  }

  return false;
}

function upperCase(value) {
  const val = value;
  for (let i in val) {
    if (val.charCodeAt(i) >= 65 && val.charCodeAt(i) <= 90) {
      return true;
    }
  }

  return false;
}

function lowerCase(value) {
  const val = value;
  for (let i in val) {
    if (val.charCodeAt(i) >= 97 && val.charCodeAt(i) <= 122) {
      return true;
    }
  }

  return false;
}

function updateUi(iconElem, textElem, isOk) {
  if (isOk) {
    iconElem.innerHTML = '<i class="fa-solid fa-check"></i>';
    textElem.classList.add("success");
  } else {
    iconElem.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    textElem.classList.remove("success");
  }
}

function showHidePass() {
  if (this.dataset.state === "show") {
    this.dataset.state = "hide";
    this.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    password.type = "password";
  } else if (this.dataset.state === "hide") {
    this.dataset.state = "show";
    this.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
    password.type = "text";
  }
}
