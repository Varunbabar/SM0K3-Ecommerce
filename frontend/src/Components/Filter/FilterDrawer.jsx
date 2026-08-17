import { Drawer, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const FilterDrawer = ({ underPrice, midPrice, highPrice }) => {
  const [priceOpen, setPriceOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  return (
    <>
        <Button
          startIcon={<FilterListIcon />}
          variant="outline"
          color="warning"
          onClick={() => setOpen(true)}
        >
          Filters
        </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-80 p-6  text-center bg-beige">
          <h1 className="font-bold text-3xl">FILTERS</h1>
        </div>
        <div className="border-b border-gray-300">
          <div className="w-80 pt-4 font-bold text-xl ">
            <Button
              onClick={() => setPriceOpen(!priceOpen)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "black",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>Prices</span>
              {priceOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
          </div>
          {priceOpen && (
            <div className="ml-4 flex flex-col gap-1 ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPrice === "low"}
                    onChange={() =>
                      setSelectedPrice(selectedPrice === "low" ? "" : "low")
                    }
                  />
                }
                label={underPrice}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPrice === "mid"}
                    onChange={() =>
                      setSelectedPrice(selectedPrice === "mid" ? "" : "mid")
                    }
                  />
                }
                label={midPrice}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPrice === "high"}
                    onChange={() =>
                      setSelectedPrice(selectedPrice === "high" ? "" : "high")
                    }
                  />
                }
                label={highPrice}
              />
            </div>
          )}
        </div>
        <div className="w-80 pt-1 font-bold text-xl">
          <Button
            onClick={() => setColorOpen(!colorOpen)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "black",
              alignItems: "center",
            }}
          >
            <span>Colors</span>
            {colorOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
          {colorOpen && (
            <div className="ml-4 flex flex-col gap-1">
              <FormControlLabel control={<Checkbox />} label="Red" />
              <FormControlLabel control={<Checkbox />} label="Green" />
              <FormControlLabel control={<Checkbox />} label="Blue" />
              <FormControlLabel control={<Checkbox />} label="Beige" />
              <FormControlLabel control={<Checkbox />} label="Pink" />
              <FormControlLabel control={<Checkbox />} label="Purple" />
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};
export default FilterDrawer;
