import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";

export default function ResCard({
  id,
  name,
  rating,
  total_votes,
  reviews,
  cost_for_two,
  payment_method,
  categories,
}) {
  // console.log(id)
  const property = {
    imageUrl: `https://picsum.photos/id/${id + 10}/720/480`,
    imageAlt: "Rear view",
    votes: total_votes,
    categories,
    title: name,
    formattedPrice: cost_for_two,
    reviewCount: reviews,
    rating: rating,
    payment_method,
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {payment_method.card ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              card
            </Badge>
          ) : (
            ""
          )}
          {payment_method.cash ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              cash
            </Badge>
          ) : (
            ""
          )}
          {payment_method.upi ? (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              upi
            </Badge>
          ) : (
            ""
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2">
            {property.votes} votes &bull; {property.categories}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}>
          {property.title}
        </Box>

        <Box>
          ${property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            &nbsp;cost for two
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5).fill("").map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
