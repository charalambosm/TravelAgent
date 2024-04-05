import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/colors';

const EditButton = ({isEditing}) => {
    return (
        <MaterialIcons.Button
            iconStyle={{ marginRight: 0 }}
            borderRadius={12}
            name={isEditing ? "save" : "edit"}
            size={24}
            color={Colors.background}
            backgroundColor={Colors.primary[800]}
        />
    )
}

export default EditButton