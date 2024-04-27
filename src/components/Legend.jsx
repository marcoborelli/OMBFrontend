import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'

export default function PageGenericValveFamilies({ avatar_width, avatar_height, primary_size, secondary_size }) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#FF7F7F', color: '#FF7F7F', width: avatar_width, height: avatar_height }} variant='rounded' />
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={{ fontSize: primary_size }} secondaryTypographyProps={{ fontSize: secondary_size }} primary="Error" secondary="The average is higher than the theoric one (more than 30%)" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#FCD299', color: '#FCD299', width: avatar_width, height: avatar_height }} variant='rounded' />
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={{ fontSize: primary_size }} secondaryTypographyProps={{ fontSize: secondary_size }} primary="Warning" secondary="The average is higher than the theoric one (but less than 30%)" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#EBDFE1', color: '#EBDFE1', width: avatar_width, height: avatar_height }} variant='rounded' />
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={{ fontSize: primary_size }} secondaryTypographyProps={{ fontSize: secondary_size }} primary="Not Available" secondary="The average is not available for that angle" />
            </ListItem>
        </List>
    )
}