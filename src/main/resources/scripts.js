function userList() {
   $.ajax({
      url: 'http://localhost:8080/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
         userListSuccess(users);
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function userListSuccess(users) {
   $.each(users, function (index, user) {
      userAddRow(user);
   });
}

function userAddRow(user) {
   if ($("#userTable tbody").length == 0) {
      $("#userTable").append("<tbody></tbody>");
   }
   $("#userTable tbody").append(

      userBuildTableRow(user));
}

function userBuildTableRow(user) {
   return "<tr>" +
      "<td>" + user.firstname + "</td>" +
      "<td>" + user.lastname + "</td>" +
      "<td>" + user.age + "</td>" +
      "<td>" + "<button type='button' id='deleteButton' class='btn btn-primary' onclick='deleteClick(" + user.id +");'> Delete </button>"+ "</td>" +
      "<td>" + "<button type='button' id='editButton' class='btn btn-primary' onclick='editClick(" + user.id +");'> Edit </button>"+ "</td>" +
      "<td>" + "<form> <input type='checkbox' id='check"+ user.id +"' name='checkbox' value='yes' > </form>"+ "</td>" +
      "</tr>";
}

function handleException(request, message, error) {
   let msg = "";
   msg += "Code: " + request.status + "\n";
   msg += "Text: " + request.statusText + "\n";
   if (request.responseJSON != null) {
      msg += "Message" + request.responseJSON.Message + "\n";
   }
   alert(msg);
}

function formClear() {
   $("#firstname").val("");
   $("#lastname").val("");
   $("#age").val("");
}

function updateClick() {
   const User = {};
   User.firstname = $("#firstname").val();
   User.lastname = $("#lastname").val();
   User.age=$("#age").val();
   userAdd(User);
}

function userAdd(user) {
   $.ajax({
      url: "http://localhost:8080/api/users",
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(user),
      success: function (user) {
         userAddSuccess(user);
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function deleteAllClick() {
   $.ajax({
      url: 'http://localhost:8080/api/users',
      type: 'DELETE',
      success: function () {
         userDeleteSuccess();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function deleteClick(id) {
    $.ajax({
      url: 'http://localhost:8080/api/users/' + id,
      type: 'DELETE',
      success: function () {
         location.reload();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}
function deleteChekClick() {
   let selectedIds = [];

   $("#userTable tbody input[type='checkbox']:checked").each(function () {
      let id = $(this).attr('id').replace('check', '');
      selectedIds.push(parseInt(id));
   });

   for(const id of selectedIds){
         deleteClick(id)
   }
}

function editClick(id) {

   const user = {};
   user.firstName = $("#firstname").val();
   user.lastName = $("#lastname").val();
   user.age = $("age").val();

   $.ajax({
      url: 'http://localhost:8080/api/users/edit/' + id,
      type: 'PUT',
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify(user),
      success: function () {
         location.reload();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function updateLastNamesClick() {
   $.ajax({
      url: 'http://localhost:8080/api/users/lastname',
      type: 'PUT',
      success: function () {
         location.reload();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function updateFirstNamesClick() {
   $.ajax({
      url: 'http://localhost:8080/api/users/firstname',
      type: 'PUT',
      success: function () {
         location.reload();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function deleteEvenClick() {
   $.ajax({
      url: 'http://localhost:8080/api/users/even',
      type: 'DELETE',
      success: function () {
         location.reload();
      },
      error: function (request, message, error) {
         handleException(request, message, error);
      }
   });
}

function userDeleteSuccess() {
   $("#userTable tbody").remove();
}

function userAddSuccess(user) {
   userAddRow(user);
   formClear();
}