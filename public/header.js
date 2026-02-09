const header = document.querySelector('.top');

const htmlString = `
  <h1 id="main_title">Miguel Medina</h1>

  <nav class="navigation">
    <a href="index.html">Home</a>
    <a href="second_page.html">My Travels</a>
  </nav>

  <div class="header-controls">
    <label>
      <input type="checkbox" autocomplete="off" />
      Dark mode
    </label>
    <button id="menu-button">Menu</button>
  </div>
`;

header.insertAdjacentHTML('beforeend', htmlString);

const btn = document.querySelector('#menu-button');
const nav = document.querySelector('.navigation');

btn.addEventListener('click', () => {
     console.log('Menu button clicked!');  
        nav.classList.toggle('show');
      
    
});

const body= document.querySelector('body');
body.addEventListener('click', (event) => {
    if (event.target !== btn && !nav.contains(event.target)) {
        nav.classList.remove('show');
    }
});


const checkbox = document.querySelector('input');

checkbox.addEventListener('change', () => { 
    
    document.body.classList.toggle('darkmode');
    localStorage.setItem('darkmode', document.body.classList.contains('darkmode'));
});

const savedDarkMode = localStorage.getItem('darkmode') === 'true';

if (savedDarkMode) {
  document.body.classList.add('darkmode');
  checkbox.checked = true;
}

//--------------------------------------------------------------------------------------------------------
function isValidEmail(stringToTest) {
    const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

    // Regex from https://colinhacks.com/essays/reasonable-email-regex
    return emailRegex.test(stringToTest);
}

const form = document.querySelector('form');

form.addEventListener('submit',(event)=>{
   

    const emailInput = document.querySelector('input[type="email"]');
    
    if (!isValidEmail(emailInput.value)){

        //adding the email error and adding or removing the error sentence
        const error_check=document.querySelector("#email-error");
        if( error_check!= null){
            error_check.remove();
        }
        // this adds the sentence
        const error = document.createElement("p");

        error.id= "email-error";
        error.innerText = "Email is formatted wrong";

        emailInput.setAttribute("aria-invalid", "true");
        emailInput.setAttribute("aria-describedby", "email-error");
        emailInput.focus();


        emailInput.after(error);
        
        event.preventDefault();
    }
    else{
    

        emailInput.removeAttribute("aria-invalid");
        emailInput.removeAttribute("aria-describedby");

    }

    const survey_checkbox = form.querySelectorAll('input[type="checkbox"]'); 
    let onechecked = false;
    for(const element of survey_checkbox){
        if(element.checked){
            onechecked = true;
            break
        }
    }
    if (!onechecked) {
        // 1️ Remove any old checkbox error
        const oldCheckboxError = document.querySelector("#checkbox-error");
        if (oldCheckboxError) oldCheckboxError.remove();
    
        // 2️ Create new error message
        const checkboxError = document.createElement("p");
        checkboxError.id = "checkbox-error";
        checkboxError.innerText = "Please select at least one option";
    
        // 3️ Insert after the fieldset
        const fieldset = document.querySelector("fieldset");
        fieldset.after(checkboxError);
    
        // 4️ Set ARIA attributes on all checkboxes
        for (const box of survey_checkbox) {
            box.setAttribute("aria-invalid", "true");
            box.setAttribute("aria-describedby", "checkbox-error");
        }
    
        // 5️⃣ Focus the first checkbox
        survey_checkbox[0].focus();
    
        // 6️⃣ Prevent form submission
        event.preventDefault();
    } else {
        // Remove ARIA attributes if valid
        for (const box of survey_checkbox) {
            box.removeAttribute("aria-invalid");
            box.removeAttribute("aria-describedby");
        }
    }
    




});




