import { Card, CardContent, CardHeader } from "./ui/card";

const reviews = [
  {
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Rebecca Davis",
    rating: "⭐⭐⭐⭐⭐",
    ratingNumber: 4.8,
    desc: "Fast and high quality",
  },
  {
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "David Miller",
    rating: "⭐⭐⭐⭐",
    ratingNumber: 4.5,
    desc: "Perfect for professional work",
  },
  {
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    name: "Jennifer Thompson",
    rating: "⭐⭐⭐⭐⭐",
    ratingNumber: 4.9,
    desc: "Best streaming transcoder ever",
  },
  {
    img: "https://randomuser.me/api/portraits/med/women/11.jpg",
    name: "Amanda Parker",
    rating: "⭐⭐⭐⭐",
    ratingNumber: 4.7,
    desc: "Great for podcast editing",
  },
  {
    img: "https://randomuser.me/api/portraits/men/28.jpg",
    name: "Michael Roberts",
    rating: "⭐⭐⭐⭐",
    ratingNumber: 4.6,
    desc: "Excellent format support system",
  },
];

const Reviews = () => {
  return (
    <div className="flex flex-wrap max-w-6xl gap-4 cursor-pointer">
      {reviews.map(({ img, name, desc ,rating}) => (
        <Card className="my-2 hover:bg-[#18181A]">
          <CardHeader>
            <div className="flex items-center gap-5">
              <div className="w-10">
                <img src={img} className="rounded-full" />
              </div>
              <div>
                <p className="font-Montserrat">{name}</p>
                <p className="font-Montserrat">{rating}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-Montserrat">{desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;
