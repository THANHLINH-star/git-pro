// event listeners
eventListeners();
function eventListeners() {
  const ui = new UI();
  //preload
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });

  // submit the form
  document.querySelector(".drink-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.querySelector(".input-name").value;
    let lastname = document.querySelector(".input-lastname").value;
    let email = document.querySelector(".input-email").value;

    let values = ui.checkvalue(name, lastname, email);

    if (values) {
      let customer = new Customer(name, lastname, email);
      console.log(customer);

      ui.addCustomer(customer);

      ui.showFeedBack("FeedBack Is Successfull!", "success");
    } else {
      ui.showFeedBack("Some Form Values Empty!", "error");
    }
  });

  // show modal
  let links = document.querySelectorAll(".work-item__icon");
  links.forEach(item => {
    item.addEventListener("click", event => {
      ui.showModal(event);
    });
  });
  //hide modal
  document.querySelector(".work-modal__close").addEventListener("click", () => {
    ui.removeModal();
  });
}

//constructor
function UI() {}

// hide preload function
UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};

// check value function
UI.prototype.checkvalue = function(name, lastname, email) {
  let result;
  if (name === "" || lastname === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

// feedback function
UI.prototype.showFeedBack = function(text, type) {
  if (type === "success") {
    let feedback = document.getElementById("feedback");
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    let feedback = document.getElementById("feedback");
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};

//remove alert function
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.getElementById("feedback").classList.remove(type);
  }, 3000);
};

// addCustomer
UI.prototype.addCustomer = function(customer) {
  const item = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * item.length);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img src="img/${random}.jpg" alt="person" class="person__thumbnail" width="80rem" height="80rem">
  <h4 class="person__name">${customer.name}</h4>
  <h4 class="person__lastname">${customer.lastname}</h4>`;
  document.querySelector(".drink-card__list").appendChild(div);
};

//show modal
UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    let id = event.target.parentElement.dataset.id;
    let modal = document.querySelector(".work-modal");
    let modalItem = document.querySelector(".work-modal__item");

    modal.classList.add("work-modal--show");
    modalItem.style.backgroundImage = `URL(img/work-${id}.jpg)`;
  }
};

//hide modal
UI.prototype.removeModal = function() {
  document.querySelector(".work-modal").classList.remove("work-modal--show");
};

// constructor customer
function Customer(name, lastname, email) {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
}
