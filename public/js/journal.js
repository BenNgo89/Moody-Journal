// $("#activity-section").

//data: updated date (left side)
$.get("/api/user_data").then(function (data) {
  //console.log(data);
  $(".member-name").text(data.email);

  $.get("/api/user_activity/" + data.id).then(function (data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newDiv = $("<div>");
      var newButton = $("<a>").addClass("btn btn-xl btn-dark mt-2 mr-2");
      newButton.text(data[i].activity);
      //console.log("AA");
      var newDate = data[i].createdAt.slice(0, 10);
      newDiv.append(data[i].createdAt).append(newButton);
      $("#activity-section").append(newDiv);
    }
  });
});

//data: activity button (rignt side)

$.get("/api/diary").then(function (data) {
  console.log(data); //data parameter only passes every entry from dbDiaries
  const chartDates = [];
  const chartValues = [];
  for (let i = 0; i < data.length; i++) {
    var newMood = data[i].mood;
    var newEntry = data[i].entry;
    var newDate = data[i].createdAt.slice(0, 10);
    console.log(newMood, newEntry, newDate);
    chartDates.push(newDate);
    chartValues.push(newEntry);
  }

  //ChartJS Code
  let myChart = document.getElementById('myChart').getContext('2d');
  let massPopChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: chartDates, //Want to display dates from Journal table
      datasets: [{
        label: 'Feeling',
        data: chartValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', //red
          'rgba(54, 162, 235, 0.6)', //blue
          'rgba(255, 206, 86, 0.6)', //yellow
          'rgba(75, 192, 192, 0.6)', //green
          'rgba(153, 102, 255, 0.6)' //purple
        ]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Mood Tracker',
        fontSize: 25
      },
      legend: {
        display: false,
        position: 'left'
      },
      layout: {
        padding: {
          right: 100,
          bottom: 100
        }
      }
    }
  });

});
