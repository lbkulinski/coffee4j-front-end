import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

type Props = {
    requestUrl: string
}

type Record = {
    id: number,
    name: string
}

function loadRecords(props: Props, page: number, setPageCount: React.Dispatch<React.SetStateAction<number>>,
                     setRecords: React.Dispatch<React.SetStateAction<Record[]>>): void {
    $.ajax({
        "type": "GET",
        "url": props.requestUrl,
        "headers": {
            "x-api-key": "baf35be0-51a9-44ee-86eb-bae384db9795"
        },
        "data": {
            "page": page,
            "limit": 25
        },
        "success": (records: Record[], textStatus: "success" | "notmodified" | "nocontent", request: JQuery.jqXHR) => {
            let countString = request.getResponseHeader("Pagination-Count");

            if (countString === null) {
                return;
            } //end if

            let count = parseInt(countString);

            if (isNaN(count)) {
                return;
            } //end if

            let limit = 25;

            let pageCount = Math.ceil(count / limit);

            setPageCount(pageCount);

            setRecords(records);
        }
    });
} //loadRecords

function RecordTable(props: Props) {
    const [pageCount, setPageCount] = useState<number>(0);

    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        let page = 0;

        loadRecords(props, page, setPageCount, setRecords);
    }, []);

    return (
        <>
            <Table striped hover>
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
                        records.map((record: Record) => (
                            <RecordRow key={record.id} name={record.name} />
                        ))
                    }
                </tbody>
            </Table>
            <ReactPaginate
                nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                onPageChange={
                    (page: {selected: number}) => loadRecords(props, page.selected, setPageCount, setRecords)
                }
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-end"
                activeClassName="active"
            />
        </>
    );
}

export default RecordTable;