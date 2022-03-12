export let selectedCategory: string = "";

const displaycategories = function() {
    // creates a list for each category, and if an item is also a foldersecondlevel or folderthirdlevel, creates another list;
    const categoriesArray = [
        { item: "nocategory" },
        {
            folderTopLevel: "Clothing",
            subfolder: [
                "Coat/Jacket",
                "Dress",
                "Intimate-Apparel",
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
                "Swimwear",
                "Tops",
                "Vest",
            ],
        },
        {
            folderSecondLevel: "Intimate-Apparel",
            subfolder: ["Bra", "Other", "Pasties", "Underwear"],
        },
        {
            folderSecondLevel: "Sweater",
            subfolder: ["Cardigan", "Other", "Pullover"],
        },
        {
            folderSecondLevel: "Tops",
            subfolder: ["Other", "Sleeveless-Top", "Strapless-Top", "Tee"],
        },

        {
            folderTopLevel: "Accessories",
            subfolder: [
                "Bag",
                "Belt",
                "Feet/Legs",
                "Hands",
                "Hat",
                "Jewelry",
                "Neck/Torso",
                "Other-Headwear",
            ],
        },
        { item: "Medical" },
        {
            folderSecondLevel: "Bag",
            subfolder: [
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
            folderSecondLevel: "Feet/Legs",
            subfolder: [
                "Boot-Toppers",
                "Booties",
                "Legwarmers",
                "Other",
                "Slippers",
                "Socks",
                "Spats",
            ],
        },
        {
            folderThirdLevel: "Socks",
            subfolder: [
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
            folderSecondLevel: "Hands",
            subfolder: [
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
            folderSecondLevel: "Hat",
            subfolder: [
                "Balaclava",
                "Beanie/Toque",
                "Beret/Tam",
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
            folderSecondLevel: "Jewelry",
            subfolder: [
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
            folderSecondLevel: "Neck/Torso",
            subfolder: [
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
            folderSecondLevel: "Other-Headwear",
            subfolder: [
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
            folderTopLevel: "Home",
            subfolder: [
                "Blanket",
                "Bookmark",
                "Cleaning",
                "Coaster",
                "Containers",
                "Cozy",
                "Curtain",
                "Decorative",
                "Lampshade",
                "Other",
                "Pillow",
                "Potholder",
                "Rug",
                "Sachet",
                "Table-Setting",
            ],
        },
        {
            folderSecondLevel: "Blanket",
            subfolder: ["Baby-Blanket", "Bedspread", "Other", "Throw"],
        },
        {
            folderSecondLevel: "Cleaning",
            subfolder: [
                "Bath-Mitt",
                "Other",
                "Scrubber",
                "Towel",
                "Washcloth/Dishcloth",
            ],
        },
        {
            folderSecondLevel: "Cozy",
            subfolder: [
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
            folderSecondLevel: "Decorative",
            subfolder: [
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
            folderSecondLevel: "Table-Setting",
            subfolder: ["Napkin", "Other", "Placemat", "Table-Runner", "Tablecloth"],
        },

        {
            folderTopLevel: "Toys-and-Hobbies",
            subfolder: [
                "Ball",
                "Blocks",
                "Costume",
                "Craft",
                "Doll-Clothes",
                "Food",
                "Game",
                "Mature-Content",
                "Mobile",
                "Other",
                "Puppet",
                "Softies",
            ],
        },
        {
            folderTopLevel: "Craft",
            subfolder: [
                "Crochet-Hook-Holder",
                "Needle-Holder",
                "Other",
                "Pin-Cushion",
                "Tape-Measure-Cover",
            ],
        },
        {
            folderSecondLevel: "Doll-Clothes",
            subfolder: ["Baby-Doll", "Child-Doll", "Fashion-doll", "Other"],
        },
        {
            folderSecondLevel: "Softies",
            subfolder: ["Animal", "Doll", "Other", "Plant", "Vehicle"],
        },

        {
            folderTopLevel: "Pet",
            subfolder: ["Accessory", "Bedding", "Clothing", "Other", "Toys"],
        },
        {
            folderTopLevel: "Components",
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
    ulSelectCategory!.style.border = "solid 1px lightgrey";
    ulSelectCategory!.style.margin = "14px 0px 14px 124px";
    const showFolderContent = function(event: MouseEvent): void {
        // folder clicked
        const folderclicked: HTMLElement | null = event.target as HTMLElement;
        // get subfolder child of folder clicked
        const folderUlChild: HTMLElement | null = folderclicked.querySelector(
            "ul.subfolder"
        );

        if (folderUlChild !== null) {
            folderUlChild.style.display = "block";
        }
    };

    const showSubFolderContent = function(event: MouseEvent): void {
        const subfolderClicked: HTMLElement | null = event.target as HTMLElement;
        const subfolderUlChild: HTMLElement | null = subfolderClicked.querySelector(
            "ul.subsubfolder"
        );
        if (subfolderUlChild !== null) {
            subfolderUlChild.style.display = "block";
        }
    };
    const showSubSubFolderContent = function(event: MouseEvent): void {
        const subsubfolderClicked: HTMLElement | null = event.target as HTMLElement;
        const subsubfolderUlChild: HTMLElement | null = subsubfolderClicked.querySelector(
            "ul.subsubsubfolder"
        );
        if (subsubfolderUlChild !== null) {
            subsubfolderUlChild.style.display = "block";
        }
    };

    for (let i = 0; i < categoriesArray.length; i++) {
        const firstKey: string = Object.keys(categoriesArray[i])[0];
        if (
            firstKey === "folderTopLevel" &&
            categoriesArray[i].folderTopLevel !== undefined
        ) {
            // folder
            const folderli = document.createElement("li");
            const foldername: string | undefined = categoriesArray[i].folderTopLevel;
            const subfolder: string[] | undefined = categoriesArray[i].subfolder;
            if (foldername !== undefined) {
                folderli.setAttribute("id", foldername!);
                folderli.textContent = foldername!;
            }

            folderli.setAttribute("class", "folder");
            folderli.addEventListener("click", showFolderContent);
            ulSelectCategory?.appendChild(folderli);
            // subfolder
            const subfolderul = document.createElement("ul");
            subfolderul.classList.add("subfolder", "childOf" + foldername);
            subfolderul.style.display = "none";
            folderli.appendChild(subfolderul);
            if (subfolder !== undefined) {
                for (let j = 0; j < subfolder.length; j++) {
                    const subfolderli = document.createElement("li");
                    subfolderli.textContent = subfolder[j];
                    subfolderli.classList.add("item", "childOf" + foldername);
                    const subfoldername: string = subfolder[j];
                    subfolderli.setAttribute("id", subfoldername);
                    subfolderul.appendChild(subfolderli);
                }
            }
        } else if (
            firstKey === "folderSecondLevel" &&
            categoriesArray[i].folderSecondLevel !== undefined
        ) {
            // subfolder
            const subfoldername: string | undefined =
                categoriesArray[i].folderSecondLevel;
            const subfolder: string[] | undefined = categoriesArray[i].subfolder;
            let liparent: HTMLElement | null = null;
            if (subfoldername !== undefined) {
                liparent = document.getElementById(subfoldername!);
            }
            const subfolderul = document.createElement("ul");
            const liparentClasses: DOMTokenList | undefined = liparent?.classList;
            subfolderul.classList.add(
                "subfolder",
                "childOf" + subfoldername,
                "g" + liparentClasses![0]
            );
            subfolderul.style.display = "none";
            liparent?.appendChild(subfolderul);
            liparent?.classList.remove("item");
            liparent?.classList.add("subfolder");

            if (subfolder !== undefined) {
                for (let j = 0; j < subfolder.length; j++) {
                    const subfolderli = document.createElement("li");
                    const subsubfoldername: string = subfolder[j];
                    subfolderli.textContent = subfolder[j];
                    subfolderli.addEventListener("click", showSubFolderContent);
                    subfolderli.classList.add(
                        "item",
                        "childOf" + subfoldername,
                        "g" + liparentClasses![0]
                    );
                    subfolderli.setAttribute("id", subsubfoldername);
                    subfolderul.appendChild(subfolderli);
                }
            }
        } else if (
            firstKey === "folderThirdLevel" &&
            categoriesArray[i].folderThirdLevel !== undefined
        ) {
            // subsubfolder: socks only
            const subsubfoldername: string | undefined =
                categoriesArray[i].folderThirdLevel;
            const subsubfolder: string[] | undefined = categoriesArray[i].subfolder;
            let liparent: HTMLElement | null = null;
            if (subsubfoldername !== undefined) {
                liparent = document.getElementById(subsubfoldername!);
            }

            const subsubfolderul = document.createElement("ul");

            subsubfolderul.style.display = "none";
            liparent?.appendChild(subsubfolderul);
            liparent?.classList.remove("item");
            liparent?.classList.add("subsubfolder");
            const liparentClasses: DOMTokenList | undefined = liparent?.classList;
            subsubfolderul.classList.add(
                "subsubfolder",
                "childOf" + subsubfoldername,
                "g" + liparentClasses![0],
                "g" + liparentClasses![1]
            );

            if (subsubfolder !== undefined) {
                for (let j = 0; j < subsubfolder.length; j++) {
                    const subsubfolderli = document.createElement("li");
                    const subsubsubfoldername: string = subsubfolder[j];
                    subsubfolderli.textContent = subsubfolder[j];
                    subsubfolderli.classList.add(
                        "item",
                        "childOf" + subsubfoldername,
                        "g" + liparentClasses![0],
                        "g" + liparentClasses![1]
                    );
                    subsubfolderli.addEventListener("click", showSubSubFolderContent);
                    subsubfolderli.setAttribute("id", subsubsubfoldername);
                    subsubfolderul.appendChild(subsubfolderli);
                }
            }
        } else {
            //is item
            const item = categoriesArray[i].item;
            if (item !== undefined) {
                const itemli = document.createElement("li");
                itemli.setAttribute("class", "item");
                itemli.textContent = item;
                ulSelectCategory?.appendChild(itemli);
            }
        }
    }

    const updateInput = function(event: MouseEvent): void {
        const clickedOnItem:
            | boolean
            | null = (event.target as HTMLElement).classList.contains("item");
        const clickedOnSubFolder:
            | boolean
            | null = (event.target as HTMLElement).classList.contains("subfolder");
        const clickedOnSubsubFolder:
            | boolean
            | null = (event.target as HTMLElement).classList.contains("subsubfolder");
        if (clickedOnItem && !clickedOnSubFolder && !clickedOnSubsubFolder) {
            const liclicked: string | null = (event.target as HTMLElement)
                .textContent;
            const inputSelectCategory = document.getElementById(
                "patterncategory"
            ) as HTMLInputElement;
            if (inputSelectCategory !== null && liclicked !== null) {
                const eventTarget: HTMLElement | null = event.target as HTMLElement;
                const eventTargetClasses: DOMTokenList | undefined =
                    eventTarget?.classList;
                const arrayClasses: string[] = Array.from(eventTargetClasses);
                let catPath: string = "";
                for (let c = 0; c < arrayClasses.length; c++) {
                    const currentClass: string = arrayClasses[c];
                    if (currentClass === "item") {
                        continue;
                    } else {
                        let cleanCat: string = "";
                        if (currentClass.substring(0, 7) === "childOf") {
                            cleanCat = currentClass.replace("childOf", "");
                        } else if (currentClass.substring(0, 8) === "gchildOf") {
                            cleanCat = currentClass.replace("gchildOf", "");
                        } else {
                            cleanCat = currentClass.replace("ggchildOf", "");
                        }
                        catPath += cleanCat + " > ";
                    }
                }

                inputSelectCategory.value = catPath + liclicked;
                selectedCategory = catPath + liclicked;
            }
            //remove categories
            const folders = document.querySelectorAll(".folder");
            folders.forEach((folder) => folder.remove());
            const items = document.querySelectorAll(".item");
            items.forEach((item) => item.remove());
        }
    };
    ulSelectCategory?.addEventListener("click", updateInput);
};

export default displaycategories;
