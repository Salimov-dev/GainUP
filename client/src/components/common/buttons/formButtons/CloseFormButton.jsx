import React from 'react';
import Button from '../button';

const CloseFormButton = ({onCloseForm}) => {
    return ( <Button onClick={onCloseForm} styles="danger" text="Закрыть" /> );
}
 
export default CloseFormButton;