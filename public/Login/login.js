async function login(event) {
  try {
    event.preventDefault();
    const obj = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const response = await axios.post("http://localhost:3000/user/login", obj);
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    window.location.href = "../User/user.html";
  } catch (error) {
    console.log(JSON.stringify(error));
    document.body.innerHTML =
      document.body.innerHTML + `<div style="color:red">${error.message}</div>`;
  }
}
