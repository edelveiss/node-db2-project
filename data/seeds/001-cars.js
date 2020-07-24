exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("cars")
      // .del() //will delete all records but id will be new, not old ones
      .truncate() //will reset id, and delete everything
      .then(function () {
        // Inserts seed entries
        return knex("cars").insert([
          {
            vin: "qw1234567yhgtrfde",
            make: "Acura",
            model: "ILX",
            mileage: 1200,
            transmission_type: "9-speed automatic",
            status_title: "clean",
          },
          {
            vin: "qw123dtyu345trfde",
            make: "Acura",
            model: "ILX",
            mileage: 1200,
            transmission_type: "not specified",
            status_title: "clean",
          },
          {
            vin: "qw123456lkdso86de",
            make: "Alpha Romeo",
            model: "4C",
            mileage: 5500,
            transmission_type: "9-speed automatic",
            status_title: "salvage",
          },
          {
            vin: "qw1234567y9i0768u",
            make: "Audi",
            model: "A5",
            mileage: 4500,
            transmission_type: "9-speed automatic",
            status_title: "clean",
          },
          {
            vin: "qhgred347yhgtrfde",
            make: "BMW",
            model: "2 Series Gran",
            mileage: 30000,
            transmission_type: "not specified",
            status_title: "salvage",
          },
          {
            vin: "qw1234567yhe54fde",
            make: "Chevrolet",
            model: "Blazer3",
            mileage: "3200",
            transmission_type: "9-speed automatic",
            status_title: "salvage",
          },
        ]);
      })
  );
};
