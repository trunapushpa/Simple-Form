var submit = function () {
    var email = $("#email")[0].value.toString();
    var number = $("#number")[0].value.toString();
    var name = $("#fname")[0].value.toString() + ' ' + $("#lname")[0].value.toString();
    $.ajax({
        method: 'post',
        url: '/api/submit',
        data:{
            name: name,
            email: email,
            number: number
        },
        success: function (res) {
            console.log(res["message"]);
            if (res["success"]) {
                $("#email")[0].value = "";
                $("#number")[0].value = "";
                $("#fname")[0].value = "";
                $("#lname")[0].value = "";
                var x = $("#container").empty();
                x.append("<div class=\"alert alert--success\">\n" +
                    "            <button type=\"button\" class=\"close\" onclick=\"$('#container').empty();\" >&times;</button>\n" +
                    "            <b>Success : </b>Details successfully saved to database." +
                    "        </div>\n" +
                    "        <br>");
            }
            else {
                if (res["message"].toString()==="This email already exists") {
                    var y = $("#container").empty();
                    y.append("<div class=\"alert alert--error\">\n" +
                        "            <button type=\"button\" class=\"close\" onclick=\"$('#container').empty();\" >&times;</button>\n" +
                        "            <b>Error : This email already exists</b>" +
                        "        </div>\n" +
                        "        <br>");
                }
                else{
                    var z = $("#container").empty();
                    z.append("<div class=\"alert alert--warning\">\n" +
                        "            <button type=\"button\" class=\"close\" onclick=\"$(\'#container\').empty();\" >&times;</button>\n" +
                        "            <b>Error : </b>" + res["message"] +
                        "        </div>\n" +
                        "        <br>");
                }
            }
        }
    })
};