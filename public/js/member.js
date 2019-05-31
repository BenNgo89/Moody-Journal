// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
  $(".member-name").text(data.email);
  $("#user-add").attr("data-user", data.id);
  $.get("/api/user_activity/" + data.id).then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newButton = $("<a>")
        .addClass("btn btn-xl btn-dark mt-2 mr-2")
        .attr("href", "#");
      newButton.text(data[i].activity);
      $("#action").append(newButton);
    }
  });
});
