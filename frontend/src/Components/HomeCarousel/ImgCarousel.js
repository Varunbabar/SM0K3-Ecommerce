import sneaker from "../../assets/Carousel/sneaker.png"
import white from "../../assets/Carousel/white.png"
import yellow from "../../assets/Carousel/yellow.png"
export const ImgCarousel = [
    {
        className:"bg-beige",
        image: sneaker,
        buttons:[{
            text:"Men",
            path: "/men",
            
        },
        {
            text:"Women",
            path:"/women"
        },
        ],      
    },
   
    {
        className:"bg-beige",
        image:yellow,
        buttons:[{
            text:"ADD TO CART",
            path:"/drop",
        },],

    },
    {
        className:"bg-beige",
        image: white,
         buttons:[{
            text:"SHOP NOW",
            path:"/lace"
        }]
       
    },
    
]