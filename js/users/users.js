async function users() {
  let users = "";
  let data = await fetch("https://6ab4fed824ee9d3caa1c072b.mockapi.io/users");
  let res = await data.json();

  users = res?.map((user) => {
    const birthDate = user.birthDate.split("T")[0];
    return ` <tr>
                        <td>${user.fullName}</td>
                        <td class="profile">
                          <img src=${user.image} alt="user">
                        </td>
                        <td>${birthDate}</td>
                        <td>${user.phone}</td>
                        <td>${user.zipCode}</td>
                        <td>
                            <button class="view" id="viewBtn" data-id=${user.id}>view</button>
                        </td>
                    </tr>`;
  });
  document
    .querySelector("#user-table")
    .insertAdjacentHTML("beforeend", users.join(" "));

  document.querySelectorAll("#viewBtn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const targetId = e.target.dataset.id;
      document.querySelector("#cover").classList.add("active");
      getById(targetId);
    });
  });

  async function getById(id) {
    let data = await fetch(
      `https://6ab4fed824ee9d3caa1c072b.mockapi.io/users/${id}`,
    );
    let res = await data.json();
    const birthDate = res.birthDate.split("T")[0];

    const user = `        
    <button class="close" id="closeBtn">&times;</button>
    <div class="image">
            <img src=${res.image} alt="user">
        </div>
        <div class="name">
            ${res.fullName}
        </div>
        <div class="date">
            ${birthDate}
        </div>
        <div class="phoneZip">
            <div class="phone">
                ${res.phone}
            </div>
            <div class="zip">
                ${res.zipCode}
            </div>
        </div>`;

    document
      .querySelector("#cover>.modal")
      .insertAdjacentHTML("beforeend", user);

      document.querySelectorAll("#closeBtn").forEach((btn)=>{
        btn.addEventListener("click",function(e){
            e.target.parentElement.innerHTML = ''
             document.querySelector("#cover").classList.remove("active");
        })
      })
  }
}

export default users;
