import React, {useEffect} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import Record from "./Record";
import loadRecords from "./loadRecords";

type Props = {
    requestUrl: string,
    pageCount: number,
    setPageCount: Function,
    setPage: Function,
    records: Record[],
    setRecords: Function
}

function RecordTable(props: Props) {
    useEffect(() => {
        let page = 0;

        loadRecords(props.requestUrl, page, props.setPageCount, props.setRecords);
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
                        props.records.map((record: Record) => (
                            <RecordRow key={record.id} name={record.name} />
                        ))
                    }
                </tbody>
            </Table>
            <ReactPaginate
                nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                onPageChange={
                    (page: {selected: number}) => {
                        props.setPage(page.selected);

                        loadRecords(props.requestUrl, page.selected, props.setPageCount, props.setRecords);
                    }
                }
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={props.pageCount}
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