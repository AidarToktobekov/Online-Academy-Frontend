import {Button} from "@mui/material";

export default function Home() {
  console.log("\u041d\u0435\u0430\u043a\u0442\u0438\u0432");

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 gap-6">
        <h1 className="col-span-2 text-center mt-7 font-bold text-2xl">
          Online Academy
        </h1>
        <p className="col-span-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eligendi hic magnam magni maiores placeat porro totam unde! Consequuntur eum, fugiat inventore laborum odio suscipit ut. Accusamus animi distinctio doloremque earum, eius enim, in ipsa minus odio odit possimus quasi reiciendis similique tempore, ut vero voluptatibus! Architecto asperiores consectetur debitis dicta eveniet fuga fugit incidunt inventore laudantium magnam, magni, minima numquam quas quibusdam quidem? Ab aliquid at atque blanditiis commodi consequuntur corporis debitis dolor ea eaque enim eos error esse est excepturi, hic illum in ipsum laboriosam libero, nihil odio perferendis perspiciatis quae quod ratione repudiandae tempora totam unde voluptatem!
        </p>
        <Button variant="contained" color="primary" href="/login">
          Sign-in
        </Button>
        <Button variant="contained" color="primary" href="/register">
          Sign-up
        </Button>
      </div>
    </div>
  );
}
