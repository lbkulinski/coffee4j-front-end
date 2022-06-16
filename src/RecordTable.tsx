import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";

type Props = {
    requestUrl: string
}

type Item = {
    id: string,
    name: string
}

function RecordTable(props: Props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        $.ajax({
            "type": "GET",
            "url": props.requestUrl,
            "headers": {
                "x-api-key": "baf35be0-51a9-44ee-86eb-bae384db9795"
            },
            "data": {
                "limit": 25
            },
            "success": (response) => {
                console.log(response);

                setItems(response);
            }
        });
    }, []);

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
            {
                items.map((item: Item) => (
                    <RecordRow key={item.id} name={item.name} />
                ))
            }
            </tbody>
        </Table>
    );
}

export default RecordTable;