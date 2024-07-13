const passwordMessage = (password) => {
  return `<header>
            	<h1>Реестр дипломов | Диплом</h1>
                <p>ИС: <a target="_blank" href="https://diplom.edu.gov.kg/diplom/login">https://diplom.edu.gov.kg/diplom/login</a></p>
				<p class="auth">
                  <span><b>Логин:</b> ИЖН (ПИН)</span><br>
                  <span><b>Пароль:</b> ${password}</span>
                </p>
            	<h2>Внимание:</h2>
            	<p>Не делитесь своим паролем ни с кем.</p>
            </header>`;
};

module.exports = { passwordMessage };
