var select = 0;
var getid = "";
var finalid = [];
var editing = 0;
var edit = 0;
var formopen = 0;
var tempArrayLength = tabledata.length;
var arrayLength = tabledata.length;
var datacopied = false;

function resetAll() {
    finalid = [];
    getid = "";
    select = 0;
    formopen = 0;
    editing = 0;
    edit = 0;
    $('#newEventForm')[0].reset();
}

function makerequest() {
    $.ajax({
        url: 'querydata.php',
        success: function(data) {
            data => data.json();
            var tabledata = JSON.parse(data)
            tempArrayLength = tabledata.length;
            arrayLength = tabledata.length;
            for (var i = 0; i < arrayLength; i++) {
                var tempname = tabledata[i]['eventname'];
                var tempdetails = tabledata[i]['details'];
                var tempcolour = tabledata[i]['colour'];
                var tempplace = tabledata[i]['id'];
                if (tempplace == "copy") {
                    datacopied = true;
                    tempArrayLength -= 1;
                    document.getElementById("clearClipboard").style.opacity = 1.0;
                    document.getElementById("clearClipboard").disabled = false;
                    document.getElementById("clearClipboard").style.cursor = "pointer";
                }
                else {
                    $("#"+tempplace).children("div.name").text(tempname);
                    $("#"+tempplace).children("div.details").text(tempdetails);
                    $("#"+tempplace).css("background-color", tempcolour);
                    $("#"+tempplace).css("color", "white");
                    if (tempcolour == "cyan") {
                        $("#"+tempplace).css("color", "black");
                    }
                    if (tempcolour == "yellow") {
                        $("#"+tempplace).css("color", "black");
                    }
                    if (tempcolour == "white") {
                        $("#"+tempplace).css("color", "black");
                    }
                    if (tempcolour == "rgb(0, 255, 255)") {
                        $("#"+tempplace).css("color", "black");
                    }
                    if (tempcolour == "rgb(255, 255, 0)") {
                        $("#"+tempplace).css("color", "black");
                    }
                    if (tempcolour == "rgb(255, 255, 255)") {
                        $("#"+tempplace).css("color", "black");
                    }
                    $("#"+tempplace).addClass("unabletoactivate");
                }
            }
            setTimeout(makerequest, 1000);
        }
    });

}

makerequest();

if (tempArrayLength > 0) {
    document.getElementById("editEvent").style.opacity = 1.0;
    document.getElementById("editEvent").style.cursor = "pointer";
    document.getElementById("editEvent").disabled = false;
}

function beginEditing() {
    if (edit == 0) {
        if (editing == 0) {
            editing = 1;
            $("#editEvent").text("Editing Event");
        }
        else {
            editing = 0;
            $("#editEvent").text("Edit Event");
        }
    }
}

$('td').hover(function() {
    var t = parseInt($(this).index()) + 1;
    if ($(this).children("div.name").text() != "") {
        let detailsthis = $(this).children("div.details").text();
        if (detailsthis == "") {
            detailsthis = "-";
        }
        $("#details").text("Details: " + detailsthis);
        //console.log(detailsthis);
    }
    $('td:nth-child(' + t + ')').addClass('highlighted');
},function() {
    $("#details").text("");
    var t = parseInt($(this).index()) + 1;
    $('td:nth-child(' + t + ')').removeClass('highlighted');
});

$('td').click(function() {
    if (formopen == 0) {
        if ($(this).parent().parent().children().index($(this).parent()) > 0 && $(this).parent().children().index($(this)) > 0) {
            if (editing == 1) {
                if($(this).hasClass('unabletoactivate') == true) {
                    finalid.push($(this).attr('id'));
                    document.getElementById("newEventForm").style.visibility = "visible";
                    document.getElementById("pasteEvent").disabled = true;
                    document.getElementById("pasteEvent").style.cursor = "not-allowed";
                    if (datacopied) {
                        document.getElementById("pasteEvent").disabled = false;
                        document.getElementById("pasteEvent").style.cursor = "pointer";
                    }
                    formopen = 1;
                    document.getElementById("deleteEvent").disabled = false;
                    document.getElementById("copyEvent").disabled = false;
                    document.getElementById("deleteEvent").style.cursor = "pointer";
                    document.getElementById("copyEvent").style.cursor = "pointer";
                    editing = 0;
                    edit = 1;
                }
            }
            else {
                document.getElementById("addEvent").style.opacity = 1.0;
                document.getElementById("addEvent").style.cursor = "pointer";
                document.getElementById("addEvent").disabled = false;
                if($(this).hasClass('selected') == true) {
                    $(this).removeClass('selected'); 
                    $(this).addClass('wasRemoved');
                    select--;
                    if (tempArrayLength > 0 && select == 0) {
                        document.getElementById("editEvent").style.opacity = 1.0;
                        document.getElementById("editEvent").style.cursor = "pointer";
                        document.getElementById("editEvent").disabled = false;
                    }
                    const index = finalid.indexOf($(this).attr('id'));
                    if (index > -1) {
                        finalid.splice(index, 1);
                    }
                }
                if($(this).hasClass('wasRemoved') == false) {
                    $(this).addClass('selected');
                    document.getElementById("editEvent").style.opacity = 0.6;
                    document.getElementById("editEvent").style.cursor = "not-allowed";
                    document.getElementById("editEvent").disabled = true;
                    select++;
                    getid = $(this).attr('id');
                }
                $('td').removeClass('wasRemoved');
                if($(this).hasClass('unabletoactivate') == true) {
                    $(this).removeClass('selected');
                    select--;
                    if (tempArrayLength > 0 && select == 0) {
                        document.getElementById("editEvent").style.opacity = 1.0;
                        document.getElementById("editEvent").style.cursor = "pointer";
                        document.getElementById("editEvent").disabled = false;
                    }
                    getid = "";
                }
                if (select==0) {
                    document.getElementById("addEvent").style.opacity = 0.6;
                    document.getElementById("addEvent").style.cursor = "not-allowed";
                    document.getElementById("addEvent").disabled = true;
                }
                if (getid != "") {
                    finalid.push(getid);
                    getid = "";
                }
            }
        }
    }
});

function openForm() {
    if (edit == 0) {
        document.getElementById("newEventForm").style.visibility = "visible";
        document.getElementById("copyEvent").disabled = true;
        document.getElementById("copyEvent").style.cursor = "not-allowed";
        document.getElementById("deleteEvent").disabled = true;
        document.getElementById("deleteEvent").style.cursor = "not-allowed";
        document.getElementById("pasteEvent").disabled = true;
        document.getElementById("pasteEvent").style.cursor = "not-allowed";
        if (datacopied) {
            document.getElementById("pasteEvent").disabled = false;
            document.getElementById("pasteEvent").style.cursor = "pointer";
        }
        formopen = 1;
        edit = 1;
        if (editing == 1) {
            editing = 0;
        }
    }
}

function deletingEvent() {
    $.ajax({
        type: "POST",
        url:"datadel.php",
        data: { 
            "id": finalid
        },
        success: function(){
        }
    })

    $("#"+finalid[0]).children("div.name").text("");
    $("#"+finalid[0]).children("div.details").text("");
    $("#"+finalid[0]).css("background-color", "");
    $("#"+finalid[0]).css("color", "white");

    $("#"+finalid[0]).removeClass("unabletoactivate");

    document.getElementById("newEventForm").style.visibility = "hidden";

    tempArrayLength -= 1;

    if (tempArrayLength == 0) {
        document.getElementById("editEvent").style.opacity = 0.6;
        document.getElementById("editEvent").style.cursor = "not-allowed";
        document.getElementById("editEvent").disabled = true;
    }

    resetAll();

    $("#editEvent").text("Edit Event");
}

function clearCopy() {
    $.ajax({
        type: "POST",
        url:"datadel.php",
        data: { 
            "id": "copy"
        },
        success: function(){
        }
    })
    datacopied = false;
    document.getElementById("clearClipboard").style.opacity = 0.6;
    document.getElementById("clearClipboard").disabled = true;
    document.getElementById("clearClipboard").style.cursor = "not-allowed";
}

function copyingEvent() {
    var newname = $("#" + finalid[0]).children("div.name").text();
    var newdetails = $("#" + finalid[0]).children("div.details").text();
    var newcolour = $("#" + finalid[0]).css("background-color");

    $.ajax({
        type: "POST",
        url:"formhandle.php",
        data: {
            "name": newname,
            "details": newdetails,
            "colour": newcolour, 
            "id": ["copy"]
        },
        success: function(){
        }
    })

    document.getElementById("newEventForm").style.visibility = "hidden";
    $("#editEvent").text("Edit Event");

    resetAll();

    datacopied = true;
    document.getElementById("clearClipboard").style.opacity = 1.0;
    document.getElementById("clearClipboard").disabled = false;
    document.getElementById("clearClipboard").style.cursor = "pointer";
}

function pasteData() {
    document.getElementById("newEventForm").style.visibility = "hidden";

    var failsafeid = finalid;

    $.ajax({
        type: "POST",
        url:"datapaste.php",
        data: {
            "id": finalid
        },
        success: function(data){
            data => data.json();
            var obj = JSON.parse(data)
            var eventname = obj[0];
            var details = obj[1];
            var colour = obj[2];
            var count = obj[3];
            for (const currentid of failsafeid){
                $("#"+currentid).children("div.name").text(eventname);
                $("#"+currentid).children("div.details").text(details);
                $("#"+currentid).css("background-color", colour);
                $("#"+currentid).css("color", "white");
                if (colour == "cyan") {
                    $("#"+currentid).css("color", "black");
                }
                if (colour == "yellow") {
                    $("#"+currentid).css("color", "black");
                }
                if (colour == "white") {
                    $("#"+currentid).css("color", "black");
                }
                if (colour == "rgb(0, 255, 255)") {
                    $("#"+currentid).css("color", "black");
                }
                if (colour == "rgb(255, 255, 0)") {
                    $("#"+currentid).css("color", "black");
                }
                if (colour == "rgb(255, 255, 255)") {
                    $("#"+currentid).css("color", "black");
                }
                $("#"+currentid).addClass("unabletoactivate");
                $("#"+currentid).removeClass("selected");
            }
            tempArrayLength += count;
        }
    })
    
    document.getElementById("addEvent").style.opacity = 0.6;
    document.getElementById("addEvent").style.cursor = "not-allowed";
    document.getElementById("addEvent").disabled = true;
    
    document.getElementById("editEvent").style.opacity = 1.0;
    document.getElementById("editEvent").style.cursor = "pointer";
    document.getElementById("editEvent").disabled = false;

    $("#editEvent").text("Edit Event");

    resetAll();
}

$("#newEventForm").submit(function(e) {
    e.preventDefault();

    var eventname=$("#inputName").val();
    var details=$("#inputDetails").val();
    var colour=$("input[type='radio'][name='colour']:checked").val();

    $.ajax({
        type: "POST",
        url:"formhandle.php",
        data: {
            "name": eventname,
            "details": details,
            "colour": colour, 
            "id": finalid
        },
        success: function(data){
            data => data.json();
            var inc = JSON.parse(data)
            tempArrayLength += inc;
            
        }
    })

    document.getElementById("newEventForm").style.visibility = "hidden";

    for (const currentid of finalid){
        $("#"+currentid).children("div.name").text(eventname);
        $("#"+currentid).children("div.details").text(details);
        $("#"+currentid).css("background-color", colour);
        $("#"+currentid).css("color", "white");
        if (colour == "cyan") {
            $("#"+currentid).css("color", "black");
        }
        if (colour == "yellow") {
            $("#"+currentid).css("color", "black");
        }
        if (colour == "white") {
            $("#"+currentid).css("color", "black");
        }
        if (colour == "rgb(0, 255, 255)") {
            $("#"+currentid).css("color", "black");
        }
        if (colour == "rgb(255, 255, 0)") {
            $("#"+currentid).css("color", "black");
        }
        if (colour == "rgb(255, 255, 255)") {
            $("#"+currentid).css("color", "black");
        }
        $("#"+currentid).addClass("unabletoactivate");
        $("#"+currentid).removeClass("selected");
    }

    document.getElementById("addEvent").style.opacity = 0.6;
    document.getElementById("addEvent").style.cursor = "not-allowed";
    document.getElementById("addEvent").disabled = true;

    document.getElementById("editEvent").style.opacity = 1.0;
    document.getElementById("editEvent").style.cursor = "pointer";
    document.getElementById("editEvent").disabled = false;

    $("#editEvent").text("Edit Event");

    resetAll();
});

function deleteAllData() {
    var comfirm1 = confirm("Are you sure you wish to clear all timetable data?");
    if (comfirm1 == true) {
        var comfirm2 = confirm("Are you really sure? \n Current data will not be able to be restored after performing this action.");
        if (comfirm2 == true) {
            $.ajax({
                type: "POST",
                url:"dataclear.php",
                data: {
                },
                success: function(){
                }
            })
            setTimeout(function(){
                location.href = "WOWY1phptest.php";
            }, 100); 
        }
    }
}