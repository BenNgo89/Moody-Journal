// $("#activity-section").

//data: updated date (left side)
$.get("/api/user_data").then(function(data) {
  $(".member-name").text(data.email);

  $.get("/api/user_activity/" + data.id).then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newDiv = $("<div>");
      var newButton = $("<a>").addClass("btn btn-xl btn-dark mt-2 mr-2");
      newButton.text(data[i].activity);
      console.log("AA");
      newDiv.append(data[i].createdAt).append(newButton);
      $("#activity-section").append(newDiv);
    }
  });
});

//data: activity button (rignt side)
