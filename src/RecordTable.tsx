import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import {AxiosResponse} from "axios";

type Props = {
    requestUrl: string
}

type Record = {
    id: number,
    name: string
}

type ReadResponse = {
    status: string,
    content: Record[]
}

function loadRecords(props: Props, page: number, setPageCount: Function, setRecords: Function): void {
    page++;

    let requestUrl = `${props.requestUrl}?page=${page}`;

    let config = {
        "withCredentials": true
    };

    const axios = require("axios").default;

    axios.get(requestUrl, config)
         .then((response: AxiosResponse<ReadResponse>) => {
             if (response.data.status !== "SUCCESS") {
                 return;
             } //end if

             console.log(response.headers);

             let pageCountString = response.headers["page-count"];

             if (!pageCountString) {
                 return;
             } //end if

             let pageCount = parseInt(pageCountString);

             setPageCount(pageCount);

             let content = response.data.content;

             setRecords(content);
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