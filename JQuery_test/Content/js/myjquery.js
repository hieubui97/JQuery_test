const POSITION = 1;
const OFFICE = 2;


function controlCombobox(row, name) {
    if (name == 1) {
        var positions = JSON.parse(dataJson).positions;
        var result = '<select data-id="' + row["id"] + '" id="position_' + row["id"] + '" class="form-control form-control-sm">';
        positions.forEach(function (item) {
            if (row["position"] == item.id) {
                result += '<option selected value="' + row["position"] + '">' + item.name + '</option>'
            }
            else {
                result += '<option value="' + item.id + '">' + item.name + '</option>'
            }
        });
        result += '</select >';
        return result;
    }

    if (name == 2) {
        var offices = JSON.parse(dataJson).offices;
        var result = '<select data-id="' + row["id"] + '" id="office_' + row["id"] + '" class="form-control form-control-sm">';
        offices.forEach(function (item) {
            if (row["office"] == item.id) {
                result += '<option selected value="' + row["office"] + '">' + item.name + '</option>'
            }
            else {
                result += '<option value="' + item.id + '">' + item.name + '</option>'

            }
        });
        result += '</select >';
        return result;
    }

    return null;
}

function loadTable() {
    $('#table_list').DataTable(
        {
            data: JSON.parse(dataJson).users,
            paging: false,
            columns: [
                {
                    data: function (row) {
                        return '<span data-id="' + row["id"] + '" id="id_' + row["id"] + '">' + row["id"] + '</span>';
                    }
                },
                {
                    data: function (row) {
                        return '<span data-id="' + row["id"] + '" id="name_' + row["id"] + '">' + row["name"] + '</span>';
                    }
                },
                {
                    data: function (row) {
                        var result = controlCombobox(row, POSITION);
                        return result;
                    }
                },
                {
                    data: function (row) {
                        return '<input type="number" data-id="' + row["id"] + '" id="salary_' + row["id"] + '" name="salary" class="form-control form-control-sm" value="' + row["salary"] + '"/>';
                    }
                },
                {
                    data: function (row) {
                        return '<input type="date" data-id="' + row["id"] + '" id="date_' + row["id"] + '" class="form-control form-control-sm" value="' + row["start_date"] + '"/>';
                    }
                },
                {
                    data: function (row) {
                        var result = controlCombobox(row, OFFICE);
                        return result;
                    }
                },
                {
                    data: function (row) {
                        return '<input type="number" data-id="' + row["id"] + '" id="extn_' + row["id"] + '" class="form-control form-control-sm" value="' + row["extn"] + '"/>';
                    }
                },
                { data: "delete" }
            ],
            columnDefs: [
                {
                    targets: -1,
                    data: null,
                    defaultContent: '<button type="button" class="btn btn-danger">Delete</button>'
                }
            ]
        }
    );
}

$(document).ready(function () {
    var table = loadTable();

    $('#table_list tbody').on('click', 'tr', function () {
        var name = $(this).closest('[role=row]').find('td:nth-child(2)').text();
        var position = $(this).closest('[role=row]').find('td:nth-child(3) option:selected').text();
        var salary = $(this).closest('[role=row]').find('td:nth-child(4)').children().val();
        var date = $(this).closest('[role=row]').find('td:nth-child(5)').children().val();
        var office = $(this).closest('[role=row]').find('td:nth-child(6) option:selected').text();
        var extn = $(this).closest('[role=row]').find('td:nth-child(7)').children().val();

        $('#detail_name').val(name);
        $('#detail_position').val(position);
        $('#detail_salary').val(salary);
        $('#detail_date').val(date);
        $('#detail_office').val(office);
        $('#detail_extn').val(extn);
    });

    //Cach' 2:
    //$('#table_list tbody tr').on('click', 'td', function () {
    //    var id = $(this).children().data("id");
    //    var name = $('#name_' + id).text();
    //    var position = $('#position_' + id + ' option:selected').val();
    //    var salary = $('#salary_' + id).val();
    //    var date = $('#date_' + id).val();
    //    var office = $('#office_' + id + ' option:selected').val();
    //    var extn = $('#extn_' + id).val();

    //    $('#detail_name').val(name);
    //    $('#detail_position').val(position);
    //    $('#detail_salary').val(salary);
    //    $('#detail_date').val(date);
    //    $('#detail_office').val(office);
    //    $('#detail_extn').val(extn);

    //    //cach' 2
    //    //var data = table.row(this).data();
    //    //$('#detail_name').val(data["name"]);
    //    //$('#detail_position').val(data["position"]);
    //    //$('#detail_salary').val(data["salary"]);
    //    //$('#detail_date').val(data["start_date"]);
    //    //$('#detail_office').val(data["office"]);
    //    //$('#detail_extn').val(data["extn"]);
    //});

    var body = $('#table_list tbody').html();
    $('#f3').on('click', function () {
        $('#table_list tbody').html(body);

        var id = $('#id').val();
        var name = $('#name').val();

        //table.columns(0).search(id).draw();
        //table.columns(1).search(name).draw();
        var content = "";
        $('#table_list tbody tr').each(function () {
            var tr_id = $(this).closest('[role=row]').find('td:nth-child(1)').text();
            var tr_name = $(this).closest('[role=row]').find('td:nth-child(2)').text();

            if (tr_id == id || tr_name.toLowerCase().includes(name.toLowerCase())) {
                content += '<tr role="row">' + $(this).html() + '</tr>';
            }
            $('#table_list tbody').html(content);         
        });
    });

    $('#f5').on('click', function () {
        $('#id').val('');
        $('#name').val('');
    });

    $('#f10').on('click', function () {
        var data = new Array();
        $('#table_list tbody tr').each(function () {
            var item = {
                id: $(this).closest('[role=row]').find('td:nth-child(1)').text(),
                name: $(this).closest('[role=row]').find('td:nth-child(2)').text(),
                position: $(this).closest('[role=row]').find('td:nth-child(3) option:selected').text(),
                salary: $(this).closest('[role=row]').find('td:nth-child(4)').children().val(),
                date: $(this).closest('[role=row]').find('td:nth-child(5)').children().val(),
                office: $(this).closest('[role=row]').find('td:nth-child(6) option:selected').text(),
                extn: $(this).closest('[role=row]').find('td:nth-child(7)').children().val()
            };

            data.push(item);
            //console.log(item);
        });
        console.log(data);

        //var data = table.rows().data();
        //data.each(function (item, index) {
        //    // bind edit salary
        //    var salary = $('#salary_' + item.id).val();
        //    if (salary) {
        //        item.salary = salary;
        //    }
        //    // bind edit start_date
        //    var start_date = $('#date_' + item.id).val();
        //    if (start_date) {
        //        item.start_date = start_date;
        //    }
        //    // bind edit extn
        //    var extn = $('#extn_' + item.id).val();
        //    if (extn) {
        //        item.extn = extn;
        //    }
        //    // bind edit position
        //    var position = $('#position_' + item.id + ' option:selected').val();
        //    if (position) {
        //        item.position = position;
        //    }
        //    // bind edit office
        //    var office = $('#office_' + item.id + ' option:selected').val();
        //    if (office) {
        //        item.office = office;
        //    }
        //});

        //console.log(data);
    });
});