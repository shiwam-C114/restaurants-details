import {
  Flex,
  Grid,
  GridItem,
  Select,
  chakra,
  Box,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Card, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import ResCard from "./ResCard";

function RestaurantDetails({ data }) {
  const [Data, setData] = useState(data.restaurant);
  const [sortBy, setSortByStar] = useState(0);
  const [sortByPayment, setSortByPayment] = useState("all");
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState([1,2,3,4,5])
  // console.log(Data);

  function priceAsc(a, b) {
    // console.log(a,b);
    return a - b;
  }

  function _byStars(ele) {
    // console.log(sortBy);
    return ele.rating > sortBy;
  }
  function _byPaymentOption(ele) {
    console.log(ele.payment_method);
    if (sortByPayment === "card") {
      console.log("card");
      return ele.payment_method.card;
    } else if (sortByPayment === "cash") {
      return ele.payment_method.cash;
    } else if (sortByPayment === "upi") {
      return ele.payment_method.upi;
    } else {
      return ele.payment_method;
    }
  }

  return (
    <div>
      <Center>
        <Heading margin={"20px"}>Resturents Details</Heading>
      </Center>
      <Flex justifyContent={"space-between"}>
        <Flex w={"100%"}>
          <Select
            onChange={(e) => {
              setSortByStar(e.target.value);
            }}
            margin={"10px"}
            size={"sm"}
            width={"12%"}
            placeholder="sort by rating">
            <option value="1">1 STAR</option>
            <option value="2">2 STARS</option>
            <option value="3">3 STARS</option>
            <option value="4">4 STARS</option>
          </Select>

          <Select
            onChange={(e) => {
              setSortByPayment(e.target.value);
            }}
            margin={"10px"}
            size={"sm"}
            width={"15%"}
            placeholder="sort by payment">
            <option value="card">Card</option>
            <option value="cash">Cash</option>
            <option value="upi">upi</option>
            <option value="all">all</option>
          </Select>

          <Select
            onChange={(e) => {
              console.log(e.target.value);
              setSortByPriceAsc(e.target.value);
              console.log(Data);
            }}
            margin={"10px"}
            size={"sm"}
            width={"12%"}
            placeholder="high to low">
            <option value={false}>low to high</option>
          </Select>
        </Flex>

        <Flex margin={"10px"}>
          <Button
            onClick={() => setPage(0)}
            size={"sm"}
            margin={"4px"}
            colorScheme={"teal"}>
            clear
          </Button>
          {pages.map((p) => (
            <Button
              onClick={() => setPage(p)}
              disabled={p === page}
              size={"sm"}
              margin={"4px"}
              colorScheme={"teal"}>
              {p}
            </Button>
          ))}
        </Flex>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {Data.filter(_byPaymentOption)
          .filter(_byStars)
          .sort((a, b) =>
            sortByPriceAsc
              ? priceAsc(a.cost_for_two, b.cost_for_two)
              : priceAsc(b.cost_for_two, a.cost_for_two)
          )
          .map((ele, index) => {
            return page ? (
              index >= (page - 1) * 4 && index < (page - 1) * 4 + 4 ? (
                <>
                  <GridItem>
                    <ResCard
                      id={ele.id}
                      name={ele.name}
                      rating={ele.rating}
                      total_votes={ele.total_votes}
                      reviews={ele.reviews}
                      cost_for_two={ele.cost_for_two}
                      payment_method={ele.payment_method}
                      categories={ele.categories}
                    />
                  </GridItem>
                </>
              ) : (
                <></>
              )
            ) : (
              <>
                <GridItem>
                  <ResCard
                    id={ele.id}
                    name={ele.name}
                    rating={ele.rating}
                    total_votes={ele.total_votes}
                    reviews={ele.reviews}
                    cost_for_two={ele.cost_for_two}
                    payment_method={ele.payment_method}
                    categories={ele.categories}
                  />
                </GridItem>
              </>
            );
          })}
      </Grid>
    </div>
  );
}

export default RestaurantDetails;
