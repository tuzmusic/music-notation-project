import styled from "styled-components";

import { useScore } from "../contexts/useScore.tsx";

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border: solid thin grey;
    border-radius: 4px;
`

const EventsTitle = styled.h3`
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
`

const EventsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: monospace;
    font-size: 0.9rem;
`

const TableHeader = styled.thead`
    background-color: #f0f0f0;
`

const TableHeaderCell = styled.th`
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid #ccc;
    font-weight: 600;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
    
    &:hover {
        background-color: #f5f5f5;
    }
`

const TableCell = styled.td`
    padding: 0.75rem;
    border-bottom: 1px solid #e0e0e0;
`

const EmptyMessage = styled.div`
    padding: 1rem;
    text-align: center;
    color: #666;
    font-style: italic;
`

export function EventsList() {
    const { score } = useScore();
    const events = score.getEvents();

    return (
        <EventsContainer>
            <EventsTitle>Events ({events.length})</EventsTitle>
            {events.length === 0 ? (
                <EmptyMessage>No events</EmptyMessage>
            ) : (
                <EventsTable>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Type</TableHeaderCell>
                            <TableHeaderCell>Staff ID</TableHeaderCell>
                            <TableHeaderCell>Time</TableHeaderCell>
                            <TableHeaderCell>Details</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {events.map((_event, index) => {
                            const event = _event.toEventListRow()
                            return (
                                <TableRow key={events[index].id}>
                                    <TableCell>{event.id.substring(0, 3)}</TableCell>
                                    <TableCell>{event.type}</TableCell>
                                    <TableCell>{event.staffId?.substring(0, 3)}</TableCell>
                                    <TableCell>{event.time.num}/{event.time.denom}</TableCell>
                                    <TableCell>{event.details}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </EventsTable>
            )}
        </EventsContainer>
    );
}

