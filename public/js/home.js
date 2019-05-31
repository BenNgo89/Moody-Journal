$(document).ready(function() {
  //var $newJournalEntry = $(#user-type); to reference input field of what user journals

  //For moods: Here are event listeners for button/link functionalities
  $(document).on("click", "#fineMood", insertFine);
  $(document).on("click", "#happyMood", insertHappy);
  $(document).on("click", "#badMood", insertBad);
  $(document).on("click", "#terribleMood", insertTerrible);

  function insertFine() {
    var feeling = {
      mood: "fine",
      value: 2
    };
    $.post("/api/diary", feeling);
  }

  function insertHappy() {
    var feeling = {
      mood: "happy",
      value: 3
    };

    $.post("/api/diary", feeling);
  }

  function insertBad() {
    var feeling = {
      mood: "bad",
      value: 1
    };

    $.post("/api/diary", feeling);
  }

  function insertTerrible() {
    var feeling = {
      mood: "terrible",
      value: 0
    };

    $.post("/api/diary", feeling);
  }
  // activities
  $("#user-add").on("click", function() {
    var newActivity = {
      activity: $("#user-input").val(),
      UserId: $(this).data("user")
    };
    $.ajax("/api/activity", {
      type: "POST",
      data: newActivity
    }).then(function(res) {
      console.log("New activity posted");
      console.log(res);
      var newButton = $("<a>")
        .addClass("btn btn-xl btn-dark mt-2 mr-2")
        .attr("href", "#");
      newButton.text(res.activity);
      $("#action").append(newButton);
    });
    $("#user-input").val("");
  });
});
