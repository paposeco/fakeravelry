const displaycategories = function() {
    const categoriesArray = [
        { item: "no category" },
        {
            folder: "Clothing",
            subfolder: [
                "Coat/Jacket",
                "Dress",
                "Intimate-Apparel",
                "Bra",
                "Other",
                "Pasties",
                "Underwear",
                "Leggings",
                "Onesies",
                "Other",
                "Pants",
                "Robe",
                "Shorts",
                "Shrug/Bolero",
                "Skirt",
                "Sleepwear",
                "Soakers",
                "Sweater",
                "Cardigan",
                "Other",
                "Pullover",
                "Swimwear",
                "Tops",
                "Other",
                "Sleeveless-Top",
                "Strapless-Top",
                "Tee",
                "Vest",
            ],
        },
        {
            subfolder: "Intimate-Apparel",
            subsubfolder: ["Bra", "Other", "Pasties", "Underwear"],
        },
        { subfolder: "Sweater", subsubfolder: ["Cardigan", "Other", "Pullover"] },
        {
            subfolder: "Tops",
            subsubfolder: ["Other", "Sleeveless-Top", "Strapless-Top", "Tee"],
        },

        {
            folder: "Accessories",
            subfolder: [
                "Bag",
                "Backpack",
                "Clutch",
                "Drawstring",
                "Duffle",
                "Laptop",
                "Market-bag-(slouchy)",
                "Messenger",
                "Money",
                "Other",
                "Purse/Handbag",
                "Tote",
                "Wristlet",
                "Belt",
                "Feet/Legs",
                "Boot-Toppers",
                "Booties",
                "Legwarmers",
                "Other",
                "Slippers",
                "Socks",
                "Ankle",
                "Knee-highs",
                "Mid-calf",
                "Other",
                "Thigh-high",
                "Toeless",
                "Tube",
                "Spats",
                "Hands",
                "Convertible",
                "Cuffs",
                "Fingerless-Gloves/Mitts",
                "Gloves",
                "Mittens",
                "Muff",
                "Other",
                "Hat",
                "Balaclava",
                "Beanie,-Toque",
                "Beret,-Tam",
                "Billed",
                "Bonnet",
                "Brimmed",
                "Cloche",
                "Earflap",
                "Other",
                "Pixie",
                "Stocking",
                "Yarmulke",
                "Jewelry",
                "Ankle",
                "Bracelet",
                "Brooch",
                "Earrings",
                "Necklace",
                "Other",
                "Ring",
                "Neck/Torso",
                "Bib",
                "Cape",
                "Collar",
                "Cowl",
                "Necktie",
                "Other",
                "Poncho",
                "Scarf",
                "Shawl/Wrap",
                "Other",
                "Other-Headwear",
                "Earwarmers",
                "Eye-mask",
                "Hair-accessories",
                "Headband",
                "Headwrap",
                "Kerchief",
                "Other",
                "Snood",
            ],
        },
        { item: "Medical" },
        {
            subfolder: "Bag",
            subsubfolder: [
                "Backpack",
                "Clutch",
                "Drawstring",
                "Duffle",
                "Laptop",
                "Market-bag-(slouchy)",
                "Messenger",
                "Money",
                "Other",
                "Purse/Handbag",
                "Tote",
                "Wristlet",
            ],
        },
        {
            subfolder: "Feet/Legs",
            subsubfolder: [
                "Boot-Toppers",
                "Booties",
                "Legwarmers",
                "Other",
                "Slippers",
                "Socks",
                "Ankle",
                "Knee-highs",
                "Mid-calf",
                "Other",
                "Thigh-high",
                "Toeless",
                "Tube",
                "Spats",
            ],
        },
        {
            subfolder: "Socks",
            subsubfolder: [
                "Ankle",
                "Knee-highs",
                "Mid-calf",
                "Other",
                "Thigh-high",
                "Toeless",
                "Tube",
            ],
        },
        {
            subfolder: "Hands",
            subsubfolder: [
                "Convertible",
                "Cuffs",
                "Fingerless-Gloves/Mitts",
                "Gloves",
                "Mittens",
                "Muff",
                "Other",
            ],
        },
        {
            subfolder: "Hat",
            subsubfolder: [
                "Balaclava",
                "Beanie,-Toque",
                "Beret,-Tam",
                "Billed",
                "Bonnet",
                "Brimmed",
                "Cloche",
                "Earflap",
                "Other",
                "Pixie",
                "Stocking",
                "Yarmulke",
            ],
        },
        {
            subfolder: "Jewelry",
            subsubfolder: [
                "Ankle",
                "Bracelet",
                "Brooch",
                "Earrings",
                "Necklace",
                "Other",
                "Ring",
            ],
        },
        {
            subfolder: "Neck/Torso",
            subsubfolder: [
                "Bib",
                "Cape",
                "Collar",
                "Cowl",
                "Necktie",
                "Other",
                "Poncho",
                "Scarf",
                "Shawl/Wrap",
            ],
        },
        {
            subfolder: "Other-Headwear",
            subsubfolder: [
                "Earwarmers",
                "Eye-mask",
                "Hair-accessories",
                "Headband",
                "Headwrap",
                "Kerchief",
                "Other",
                "Snood",
            ],
        },

        {
            folder: "Home",
            subfolder: [
                "Blanket",
                "Baby-Blanket",
                "Bedspread",
                "Other",
                "Throw",
                "Bookmark",
                "Cleaning",
                "Bath-Mitt",
                "Other",
                "Scrubber",
                "Towel",
                "Washcloth/Dishcloth",
                "Coaster",
                "Containers",
                "Cozy",
                "Automobile",
                "Bathroom",
                "Book-Cover",
                "Coffee/Tea-Pot",
                "Cup/Mug",
                "Electronics",
                "Food-Cozy",
                "Glasses-Case",
                "Hanger-Cover",
                "Hot-Water-Bottle",
                "Lip-Balm",
                "Mature-Content-Toys",
                "Other",
                "Sports-Equipment",
                "Tissue-Box-Cover",
                "Curtain",
                "Decorative",
                "Christmas-Stocking",
                "Doily",
                "Hanging-Ornament",
                "Ornamental-Flower",
                "Other",
                "Picture-Frame",
                "Wall-Hanging",
                "Wreath",
                "Lampshade",
                "Other",
                "Pillow",
                "Potholder",
                "Rug",
                "Sachet",
                "Table-Setting",
                "Napkin",
                "Other",
                "Placemat",
                "Table-Runner",
                "Tablecloth",
            ],
        },
        {
            subfolder: "Blanket",
            subsubfolder: ["Baby-Blanket", "Bedspread", "Other", "Throw"],
        },
        {
            subfolder: "Cleaning",
            subsubfolder: [
                "Bath-Mitt",
                "Other",
                "Scrubber",
                "Towel",
                "Washcloth/Dishcloth",
            ],
        },
        {
            subfolder: "Cozy",
            subsubfolder: [
                "Automobile",
                "Bathroom",
                "Book-Cover",
                "Coffee/Tea-Pot",
                "Cup/Mug",
                "Electronics",
                "Food-Cozy",
                "Glasses-Case",
                "Hanger-Cover",
                "Hot-Water-Bottle",
                "Lip-Balm",
                "Mature-Content-Toys",
                "Other",
                "Sports-Equipment",
                "Tissue-Box-Cover",
            ],
        },
        {
            subfolder: "Decorative",
            subsubfolder: [
                "Christmas-Stocking",
                "Doily",
                "Hanging-Ornament",
                "Ornamental-Flower",
                "Other",
                "Picture-Frame",
                "Wall-Hanging",
                "Wreath",
            ],
        },
        {
            subfolder: "Table-Setting",
            subsubfolder: [
                "Napkin",
                "Other",
                "Placemat",
                "Table-Runner",
                "Tablecloth",
            ],
        },

        {
            folder: "Toys-and-Hobbies",
            subfolder: [
                "Ball",
                "Blocks",
                "Costume",
                "Craft",
                "Crochet-Hook-Holder",
                "Needle-Holder",
                "Other",
                "Pin-Cushion",
                "Tape-Measure-Cover",
                "Doll-Clothes",
                "Baby-Doll",
                "Child-Doll",
                "Fashion-doll",
                "Other",
                "Food",
                "Game",
                "Mature-Content",
                "Mobile",
                "Other",
                "Puppet",
                "Softies",
                "Animal",
                "Doll",
                "Other",
                "Plant",
                "Vehicle",
            ],
        },
        {
            subfolder: "Craft",
            subsubfolder: [
                "Crochet-Hook-Holder",
                "Needle-Holder",
                "Other",
                "Pin-Cushion",
                "Tape-Measure-Cover",
            ],
        },
        {
            subfolder: "Doll-Clothes",
            subsubfolder: ["Baby-Doll", "Child-Doll", "Fashion-doll", "Other"],
        },
        {
            subfolder: "Softies",
            subsubfolder: ["Animal", "Doll", "Other", "Plant", "Vehicle"],
        },

        {
            folder: "Pet",
            subfolder: ["Accessory", "Bedding", "Clothing", "Other", "Toys"],
        },
        {
            folder: "Components",
            subfolder: [
                "Afghan-block",
                "Applique/Embellishment",
                "Button",
                "Chart",
                "Edging",
                "Floral-block",
                "Frog",
                "Insertion",
                "Other",
                "Stitch-pattern",
                "Tutorial",
            ],
        },
    ];

    const ulSelectCategory: HTMLElement | null = document.getElementById(
        "selectcategory"
    );

    // there should be two event listeners. one for folder and a different one for subfolder. or just check the class on showfoldercontent
    const showFolderContent = function(event: MouseEvent): void {
        const folderclicked: HTMLElement | null = event.target as HTMLElement;
        console.log(folderclicked);
        //o hidden false é de children nao é de ul; also nao é um ul
        // shows every ul and li instead of just ul and direct children
        const folderUlChild: HTMLElement | null = folderclicked.querySelector(
            "ul.subfolder"
        );

        if (folderUlChild !== null) {
            const ulChildren = folderUlChild.querySelectorAll("li");
            if (ulChildren !== null) {
                ulChildren.forEach((child) => (child.hidden = false));
            }
        }
    };

    for (let i = 0; i < categoriesArray.length; i++) {
        const currentobj = categoriesArray[i];
        const isFolder = currentobj.folder;
        if (isFolder === undefined) {
            if (currentobj.item !== undefined) {
                const newli = document.createElement("li");
                ulSelectCategory?.appendChild(newli);
                newli.setAttribute("class", "item");
                newli.textContent = currentobj.item;
            } else {
                const isSubFolder = currentobj.subfolder;
                const subsubfolder = currentobj.subsubfolder;
                const subfolderparent = document.getElementById(isSubFolder);
                const newUl = document.createElement("ul");
                newUl.addEventListener("click", showFolderContent);
                newUl.setAttribute("class", "subsubfolder");
                for (let j = 0; j < subsubfolder.length; j++) {
                    const newli = document.createElement("li");
                    newli.setAttribute("class", "item");
                    newli.setAttribute("id", subsubfolder[j]);
                    newli.textContent = subsubfolder[j];
                    newli.hidden = true;
                    newUl.appendChild(newli);
                }
                subfolderparent?.appendChild(newUl);
            }
        } else {
            const li = document.createElement("li");
            li.setAttribute("class", "folder");
            li.addEventListener("click", showFolderContent);
            li.textContent = isFolder;
            ulSelectCategory?.appendChild(li);
            const newUl = document.createElement("ul");
            newUl.setAttribute("class", "subfolder");
            //newUl.addEventListener("click", showFolderContent);
            const subfolder = currentobj.subfolder;
            if (subfolder !== undefined) {
                for (let j = 0; j < subfolder.length; j++) {
                    const newli = document.createElement("li");
                    newli.textContent = subfolder[j];
                    newli.setAttribute("id", subfolder[j]);
                    newli.setAttribute("class", "item");
                    newli.hidden = true;
                    newUl.appendChild(newli);
                }
                li.appendChild(newUl);
            }
        }
    }

    const updateInput = function(event: MouseEvent): void {
        const clickedOnItem:
            | boolean
            | null = (event.target as HTMLElement).classList.contains("item");
        if (clickedOnItem) {
            const liclicked: string | null = (event.target as HTMLElement)
                .textContent;
            const inputSelectCategory = document.getElementById(
                "selectcategoryinput"
            ) as HTMLInputElement;
            if (inputSelectCategory !== null && liclicked !== null) {
                inputSelectCategory.value = liclicked;
            }
            //remove categories
            const folders = document.querySelectorAll(".folder");
            const subfolders = document.querySelectorAll(".subfolder");
            const items = document.querySelectorAll(".item");
            folders.forEach((folder) => folder.remove());
            subfolders.forEach((subfolder) => subfolder.remove());
            items.forEach((item) => item.remove());
        }
    };
    ulSelectCategory?.addEventListener("click", updateInput);
};

export default displaycategories;
