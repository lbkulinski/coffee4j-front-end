import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

function RecordTable() {
    return (
        <Table striped>
            <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Actions
                </th>
            </tr>
            </thead>
            <tbody id="tbody_records">
            </tbody>
        </Table>
    );
}

export default RecordTable;