import React, {useEffect} from 'react';
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordRow from "./RecordRow";
import Record from "./Record";
import loadRecords from "./loadRecords";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
    requestUrl: string,
    offsetId: number | null,
    setOffsetId: Function,
    records: Record[],
    setRecords: Function
}

function RecordTable(props: Props) {
    const fetchNewRecords = () => {
        if (props.offsetId === null) {
            return;
        } //end if

        let requestUrl = `${props.requestUrl}?limit=25&offsetId=${props.offsetId}`;

        loadRecords(requestUrl, props.offsetId, props.setOffsetId, props.records, props.setRecords)
    };

    useEffect(() => {
        fetchNewRecords();
    }, []);

    return (
        <InfiniteScroll next={fetchNewRecords} hasMore={props.offsetId !== null} loader={<></>}
                        dataLength={props.records.length} height={400}>
            <Table>
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
                            <RecordRow key={record.id} record={record} />
                        ))
                    }
                </tbody>
            </Table>
        </InfiniteScroll>
    );
}

export default RecordTable;