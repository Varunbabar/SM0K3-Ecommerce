import { FormControl, InputLabel , MenuItem ,Select } from "@mui/material";
import { useState } from "react";
const SortBy = () =>{
    const [sortBy , setSortBy] = useState("");
    return(
        <FormControl size="small" sx={{minWidth:220}}>
            <InputLabel>Sort by</InputLabel>
            <Select label="Sort By" 
            value={sortBy} onChange={(e) =>setSortBy(e.target.value)}>
                <MenuItem value="featured">featured</MenuItem>
                <MenuItem value="low">low to high</MenuItem>
                <MenuItem value="high">high to low</MenuItem>
                <MenuItem value="newest">newest</MenuItem>
            </Select>
        </FormControl>
    )
}
export default SortBy;