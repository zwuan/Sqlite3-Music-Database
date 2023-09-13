function Signup() {
    window.location.href = "signup.html";
}
let login = async () => {
    let account = document.getElementById("account");
    

    if (account.value == "") {
        window.alert("請輸入帳號");
        return;
    } 

    let Status = 0;
    let Message = "";
    var url = "http://127.0.0.1:5000/login/"+account.value;
    let res = await fetch(url, {
        method: 'GET'
    })
    .then((res) => {
        Status = res.status;
        console.log("Status = "+Status);
        return res.json();
    })
    .catch((error) => {
        Message = "Something Wrong";
    });
    if (Status === 200 || Status === 201) {//成功

        console.log(res.length);
        if(res.length <= 0){
            window.alert("此帳號尚未註冊過");
        }else{
            window.localStorage.setItem("UID", res[0].mid);
            window.localStorage.setItem("name", res[0].mname);
            console.log(window.localStorage.getItem("name"))
            window.location.href = "search.html";
        }
    } else {
        window.alert(res.message);
    }
}
