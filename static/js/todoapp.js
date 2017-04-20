$(document).ready(function() {
    addTask();
	loadAndShowTasks();
});

function addTask() {
    $("#add-task").submit(function (event) {

        var description = $('input[name=description]').val();
        var urgent = $('input[name=urgent]').prop('checked');

        if(urgent)
            urgent = 1;
        else
            urgent = 0;

        // process the form
        $.ajax({
            url : '/api/v1.0/tasks',
            type : 'POST',
            data : '{ "description": "' + description + '", "urgent": ' + urgent + ' }',
            contentType : 'application/json',
            success: function () {
                // reset the form
                document.getElementById("add-task").reset();
                // update the task list
                loadAndShowTasks();
            }
        });

        // stop the form from submitting the normal way
        event.preventDefault();

    });
}

function loadAndShowTasks() {
    // get the table
    var table = $("#task-list");

    // create a clone of table, temporary and empty
    var tmpTable = table.clone().empty();

    // get all the tasks from the REST server
    $.get("api/v1.0/tasks", function(data) {

        // populate it!
        for ( var i in data.tasks) {
            var tr = document.createElement("tr");

            var task = document.createElement("td");
            task.textContent = data.tasks[i].description;
            tr.appendChild(task);

            var urgent = document.createElement("td");
            urgent.textContent = data.tasks[i].urgent;
            tr.appendChild(urgent);
            tmpTable.append(tr);
        }

        // replace table with its (updated) clone
        table.replaceWith(tmpTable);
    });
}