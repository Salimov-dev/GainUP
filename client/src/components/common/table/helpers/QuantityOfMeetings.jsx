import { useSelector } from 'react-redux';
import { getMeetingsList} from '../../../../store/meetings.store';

const QuantityOfMeetings = ({id}) => {
    const meetings = useSelector(getMeetingsList())
    const quantity = meetings.filter(meet => meet.userId === id )
    return quantity.length
}
 
export default QuantityOfMeetings;