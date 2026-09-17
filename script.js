// ======================================
// EMPLOYEE DIRECTORY MANAGEMENT SYSTEM
// ======================================


// DEFAULT EMPLOYEE DATA

let employees = JSON.parse(
    localStorage.getItem("employees")
) || [

    {
        id: 1,
        name: "Aisha Mohammed",
        email: "aisha.mohammed@company.com",
        department: "Engineering",
        position: "Frontend Developer",
        salary: 105000,
        status: "Active",
        hireDate: "2023-02-28"
    },

    {
        id: 2,
        name: "David Kim",
        email: "david.kim@company.com",
        department: "Engineering",
        position: "DevOps Engineer",
        salary: 115000,
        status: "Active",
        hireDate: "2022-06-01"
    },

    {
        id: 3,
        name: "Elena Rodriguez",
        email: "elena.rodriguez@company.com",
        department: "Human Resources",
        position: "HR Manager",
        salary: 95000,
        status: "On Leave",
        hireDate: "2020-01-10"
    },

    {
        id: 4,
        name: "James Wilson",
        email: "james.wilson@company.com",
        department: "Finance",
        position: "Financial Analyst",
        salary: 85000,
        status: "Inactive",
        hireDate: "2018-04-12"
    },

    {
        id: 5,
        name: "Marcus Johnson",
        email: "marcus.johnson@company.com",
        department: "Sales",
        position: "Sales Director",
        salary: 120000,
        status: "Active",
        hireDate: "2019-08-20"
    },

    {
        id: 6,
        name: "Pragathees E V",
        email: "pragathees.ev@company.com",
        department: "Engineering",
        position: "Developer",
        salary: 100000,
        status: "Active",
        hireDate: "2026-09-17"
    },

    {
        id: 7,
        name: "Sophia Brown",
        email: "sophia.brown@company.com",
        department: "Marketing",
        position: "Marketing Specialist",
        salary: 78000,
        status: "Active",
        hireDate: "2021-03-15"
    },

    {
        id: 8,
        name: "Daniel Lee",
        email: "daniel.lee@company.com",
        department: "Engineering",
        position: "Backend Developer",
        salary: 110000,
        status: "Active",
        hireDate: "2022-11-08"
    },

    {
        id: 9,
        name: "Olivia Smith",
        email: "olivia.smith@company.com",
        department: "Finance",
        position: "Accountant",
        salary: 82000,
        status: "Inactive",
        hireDate: "2019-05-22"
    },

    {
        id: 10,
        name: "Noah Davis",
        email: "noah.davis@company.com",
        department: "Sales",
        position: "Sales Executive",
        salary: 76000,
        status: "On Leave",
        hireDate: "2023-09-04"
    }

];


// SAVE DATA

function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}


// FORMAT MONEY

function formatSalary(value) {

    return "$" + Number(value).toLocaleString();

}


// GET INITIALS

function getInitials(name) {

    return name
        .split(" ")
        .slice(0, 2)
        .map(word => word[0])
        .join("")
        .toUpperCase();

}


// FORMAT DATE

function formatDate(date) {

    const d = new Date(date + "T00:00:00");

    return d.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


// UPDATE DASHBOARD

function updateDashboard() {

    document.getElementById(
        "totalEmployees"
    ).innerText = employees.length;


    const active = employees.filter(
        employee =>
            employee.status === "Active"
    ).length;

    document.getElementById(
        "activeEmployees"
    ).innerText = active;


    const departments = new Set(
        employees.map(
            employee =>
                employee.department
        )
    );

    document.getElementById(
        "departmentCount"
    ).innerText = departments.size;


    let totalSalary = 0;

    employees.forEach(
        employee => {
            totalSalary +=
                Number(employee.salary);
        }
    );


    const average =
        employees.length > 0
            ? totalSalary / employees.length
            : 0;


    document.getElementById(
        "averageSalary"
    ).innerText =
        formatSalary(Math.round(average));

}


// DEPARTMENT FILTER

function loadDepartments() {

    const filter =
        document.getElementById(
            "departmentFilter"
        );

    const departments =
        [...new Set(
            employees.map(
                employee =>
                    employee.department
            )
        )].sort();


    filter.innerHTML =
        `<option value="all">
            All Departments
        </option>`;


    departments.forEach(
        department => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                department;

            option.textContent =
                department;

            filter.appendChild(option);

        }
    );

}


// GET FILTERED EMPLOYEES

function getFilteredEmployees() {

    const search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();


    const department =
        document.getElementById(
            "departmentFilter"
        ).value;


    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    return employees.filter(
        employee => {

            const matchesSearch =
                employee.name
                    .toLowerCase()
                    .includes(search)

                ||

                employee.email
                    .toLowerCase()
                    .includes(search)

                ||

                employee.position
                    .toLowerCase()
                    .includes(search)

                ||

                employee.department
                    .toLowerCase()
                    .includes(search);


            const matchesDepartment =
                department === "all"
                ||
                employee.department ===
                department;


            const matchesStatus =
                status === "all"
                ||
                employee.status === status;


            return (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            );

        }
    );

}


// STATUS CLASS

function getStatusClass(status) {

    if (status === "Active") {

        return "active-status";

    }

    if (status === "On Leave") {

        return "leave-status";

    }

    return "inactive-status";

}


// DISPLAY EMPLOYEES

function displayEmployees() {

    const list =
        getFilteredEmployees();


    const tbody =
        document.getElementById(
            "employeeBody"
        );


    tbody.innerHTML = "";


    list.forEach(employee => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="employee-info">

                    <div class="avatar">
                        ${getInitials(employee.name)}
                    </div>

                    <div>

                        <div class="employee-name">
                            ${employee.name}
                        </div>

                        <div class="employee-email">
                            ${employee.email}
                        </div>

                    </div>

                </div>

            </td>


            <td>
                ${employee.department}
            </td>


            <td>
                ${employee.position}
            </td>


            <td class="salary">
                ${formatSalary(employee.salary)}
            </td>


            <td>

                <span class="
                    status
                    ${getStatusClass(employee.status)}
                ">

                    ${employee.status}

                </span>

            </td>


            <td>
                ${formatDate(employee.hireDate)}
            </td>


            <td>

                <div class="actions">

                    <button
                        class="action-btn"
                        onclick="viewEmployee(${employee.id})">
                        👁
                    </button>

                    <button
                        class="action-btn"
                        onclick="editEmployee(${employee.id})">
                        ✏
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteEmployee(${employee.id})">
                        🗑
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });


    document.getElementById(
        "shownCount"
    ).innerText = list.length;


    document.getElementById(
        "allCount"
    ).innerText = employees.length;


    updateDashboard();

}


// OPEN ADD EMPLOYEE

function openAddEmployee() {

    document.getElementById(
        "employeeModal"
    ).classList.add("show");


    document.getElementById(
        "modalTitle"
    ).innerText = "Add Employee";


    document.getElementById(
        "employeeForm"
    ).reset();


    document.getElementById(
        "employeeId"
    ).value = "";


    document.getElementById(
        "hireDate"
    ).value =
        new Date()
            .toISOString()
            .split("T")[0];

}


// CLOSE MODAL

function closeModal() {

    document.getElementById(
        "employeeModal"
    ).classList.remove("show");

}


// EDIT EMPLOYEE

function editEmployee(id) {

    const employee =
        employees.find(
            employee =>
                employee.id === id
        );


    if (!employee) return;


    document.getElementById(
        "employeeModal"
    ).classList.add("show");


    document.getElementById(
        "modalTitle"
    ).innerText =
        "Edit Employee";


    document.getElementById(
        "employeeId"
    ).value =
        employee.id;


    document.getElementById(
        "name"
    ).value =
        employee.name;


    document.getElementById(
        "email"
    ).value =
        employee.email;


    document.getElementById(
        "department"
    ).value =
        employee.department;


    document.getElementById(
        "position"
    ).value =
        employee.position;


    document.getElementById(
        "salary"
    ).value =
        employee.salary;


    document.getElementById(
        "status"
    ).value =
        employee.status;


    document.getElementById(
        "hireDate"
    ).value =
        employee.hireDate;

}


// VIEW EMPLOYEE

function viewEmployee(id) {

    const employee =
        employees.find(
            employee =>
                employee.id === id
        );


    if (!employee) return;


    alert(

        "Employee Details\n\n" +

        "Name: " +
        employee.name +

        "\nEmail: " +
        employee.email +

        "\nDepartment: " +
        employee.department +

        "\nPosition: " +
        employee.position +

        "\nSalary: " +
        formatSalary(employee.salary) +

        "\nStatus: " +
        employee.status +

        "\nHire Date: " +
        formatDate(employee.hireDate)

    );

}


// DELETE EMPLOYEE

function deleteEmployee(id) {

    const employee =
        employees.find(
            employee =>
                employee.id === id
        );


    if (!employee) return;


    const confirmDelete =
        confirm(
            "Delete " +
            employee.name +
            "?"
        );


    if (!confirmDelete) return;


    employees =
        employees.filter(
            employee =>
                employee.id !== id
        );


    saveEmployees();

    loadDepartments();

    displayEmployees();

}


// FORM SUBMIT

document.getElementById(
    "employeeForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "employeeId"
            ).value;


        const employeeData = {

            id: id
                ? Number(id)
                : Date.now(),

            name:
                document.getElementById(
                    "name"
                ).value,

            email:
                document.getElementById(
                    "email"
                ).value,

            department:
                document.getElementById(
                    "department"
                ).value,

            position:
                document.getElementById(
                    "position"
                ).value,

            salary:
                Number(
                    document.getElementById(
                        "salary"
                    ).value
                ),

            status:
                document.getElementById(
                    "status"
                ).value,

            hireDate:
                document.getElementById(
                    "hireDate"
                ).value

        };


        if (id) {

            employees =
                employees.map(
                    employee =>
                        employee.id ===
                        Number(id)
                            ? employeeData
                            : employee
                );

        } else {

            employees.push(
                employeeData
            );

        }


        saveEmployees();

        loadDepartments();

        displayEmployees();

        closeModal();

    }
);


// LIST VIEW

function showList() {

    document.querySelector(
        ".table-card"
    ).style.display = "block";


    document.getElementById(
        "gridView"
    ).style.display = "none";

}


// GRID VIEW

function showGrid() {

    const grid =
        document.getElementById(
            "gridView"
        );


    const list =
        getFilteredEmployees();


    grid.innerHTML = "";


    list.forEach(employee => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "employee-card";


        card.innerHTML = `

            <div class="employee-info">

                <div class="avatar">
                    ${getInitials(employee.name)}
                </div>

                <div>

                    <div class="employee-name">
                        ${employee.name}
                    </div>

                    <div class="employee-email">
                        ${employee.email}
                    </div>

                </div>

            </div>


            <div class="card-row">

                <span>
                    Department
                </span>

                <b>
                    ${employee.department}
                </b>

            </div>


            <div class="card-row">

                <span>
                    Position
                </span>

                <b>
                    ${employee.position}
                </b>

            </div>


            <div class="card-row">

                <span>
                    Salary
                </span>

                <b>
                    ${formatSalary(employee.salary)}
                </b>

            </div>


            <div class="card-row">

                <span>
                    Status
                </span>

                <span class="
                    status
                    ${getStatusClass(employee.status)}
                ">

                    ${employee.status}

                </span>

            </div>


            <br>


            <button
                class="save-btn"
                onclick="editEmployee(${employee.id})">

                Edit

            </button>

            <button
                class="cancel-btn"
                onclick="deleteEmployee(${employee.id})">

                Delete

            </button>

        `;


        grid.appendChild(card);

    });


    document.querySelector(
        ".table-card"
    ).style.display = "none";


    grid.style.display = "grid";

}


// REFRESH

function refreshPage() {

    displayEmployees();

    loadDepartments();

}


// INITIAL LOAD

loadDepartments();

displayEmployees();
