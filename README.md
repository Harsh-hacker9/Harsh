# Preview 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Novell Services Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 50px;
        }
        table {
            border-collapse: collapse;
        }
        td {
            padding: 5px 10px;
        }
        input[type="text"], input[type="password"], select {
            width: 200px;
        }
        .role, .services {
            padding-left: 10px;
        }
        .buttons {
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <h2>Novell Services Login</h2>
    <form action="#" method="post">
        <table>
            <tr>
                <td>Username:</td>
                <td><input type="text" name="username"></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><input type="password" name="password"></td>
            </tr>
            <tr>
                <td>City of Employment:</td>
                <td><input type="text" name="city"></td>
            </tr>
            <tr>
                <td>Web server:</td>
                <td>
                    <select name="server">
                        <option value="">— Choose a server —</option>
                        <option value="server1">Server 1</option>
                        <option value="server2">Server 2</option>
                        <option value="server3">Server 3</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Please specify your role:</td>
                <td class="role">
                    <input type="radio" name="role" value="admin" id="admin">
                    <label for="admin">Admin</label><br>
                    <input type="radio" name="role" value="engineer" id="engineer">
                    <label for="engineer">Engineer</label><br>
                    <input type="radio" name="role" value="manager" id="manager">
                    <label for="manager">Manager</label><br>
                    <input type="radio" name="role" value="guest" id="guest">
                    <label for="guest">Guest</label>
                </td>
            </tr>
            <tr>
                <td>Single Sign-on to the following:</td>
                <td class="services">
                    <input type="checkbox" name="services" value="mail" id="mail">
                    <label for="mail">Mail</label><br>
                    <input type="checkbox" name="services" value="payroll" id="payroll">
                    <label for="payroll">Payroll</label><br>
                    <input type="checkbox" name="services" value="selfservice" id="selfservice">
                    <label for="selfservice">Self-service</label>
                </td>
            </tr>
            <tr>
                <td class="buttons" colspan="2">
                    <input type="submit" value="Login">
                    <input type="reset" value="Reset">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
