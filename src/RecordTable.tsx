import React, {useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import Record from "./Record";

type Props = {
    requestUrl: string,
    setEditShow: Function,
    setRecord: Function
}

type ReadResponse = {
    status: string,
    content: Record[]
}

function loadRecords(props: Props, page: number, setPageCount: React.Dispatch<React.SetStateAction<number>>,
                     setRecords: React.Dispatch<React.SetStateAction<Record[]>>): void {
    page++;

    let requestUrl = `${props.requestUrl}?page=${page}`;

    fetch(requestUrl, {
        "method": "GET",
        "mode": "no-cors",
        "credentials": "include",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response: Response) => {
        let pageCountString = response.headers.get("Page-Count");

        if (pageCountString === null) {
            return;
        } //end if

        let pageCount = parseInt(pageCountString);

        response.json()
                .then((readResponse: ReadResponse) => {
                    if (readResponse.status !== "SUCCESS") {
                        return;
                    } //end if

                    setPageCount(pageCount);

                    let content = readResponse.content;

                    setRecords(content);
                });
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
                            <RecordRow key={record.id} id={record.id} name={record.name} setRecord={props.setRecord}
                                       setEditShow={props.setEditShow} />
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