async function addUser(event) {
  try {
    event.preventDefault();
    const obj = {
      username: event.target.username.value,
      email: event.target.email.value,
      mobile: event.target.mobile.value,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/users/add-user",
      obj,
      { headers: { Authorization: token } }
    );
    showUserOnScreen(response.data.newUserAdded);
  } catch (error) {
    console.log(error);
    document.body.innerHTML =
      document.body.innerHTML + "<h4>Something went wrong!</h4>";
  }
}
function showUserOnScreen(obj) {
  const parentElement = document.getElementById("userTable");
  const childElement = `<tr id=${obj._id}><td>${obj.username}</td><td>${obj.email}</td><td>${obj.mobile}</td>
            <td><button class="btn btn-primary" onclick="editUser('${obj._id}','${obj.username}','${obj.email}','${obj.mobile}')">Edit User
                <button class="btn btn-danger" onclick="deleteUser('${obj._id}')">Delete User
            </td></tr>`;
  parentElement.innerHTML = parentElement.innerHTML + childElement;
}

async function deleteUser(userID) {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/users/delete-user/${userID}`, {
      headers: { Authorization: token },
    });
    removeUserFromScreen(userID);
  } catch (error) {
    console.log(error);
    document.body.innerHTML =
      document.body.innerHTML + "<h4>Something went wrong!</h4>";
  }
}

function removeUserFromScreen(userID) {
  document.getElementById(userID).remove();
}

function editUser(id, username, email, mobile) {
  document.getElementById("username").value = username;
  document.getElementById("email").value = email;
  document.getElementById("mobile").value = mobile;
  deleteUser(id);
}

function displayImage(pic) {
  let divLocation = document.getElementById("profilepic");
  let imgElement = document.createElement("img");
  imgElement.src = pic;
  divLocation.append(imgElement);
  divLocation.innerHTML += imgElement;
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/users/profile-pic",
      {
        headers: { Authorization: token },
      }
    );
    displayImage(response.data.message[0].profile);
  } catch (error) {
    console.log(error);
    document.body.innerHTML =
      document.body.innerHTML + "<h4>Something went wrong!</h4>";
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users/get-user", {
      headers: { Authorization: token },
    });
    for (var i = 0; i < response.data.allUsers.length; i++) {
      showUserOnScreen(response.data.allUsers[i]);
    }
  } catch (error) {
    console.log(error);
    document.body.innerHTML =
      document.body.innerHTML + "<h4>Something went wrong!</h4>";
  }
});
