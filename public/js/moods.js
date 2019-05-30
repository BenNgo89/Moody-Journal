$(document).ready(function() {
  //var $newJournalEntry = $(#user-type); to reference input field of what user journals

  //Here are event listeners for button/link functionalities
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

    $.post("/api/diary", feeling); //need to know user id
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
});
