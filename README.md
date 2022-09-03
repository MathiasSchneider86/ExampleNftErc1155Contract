# ExampleNftErc1155Contract
Example with 3 tokens, metadata and images

## Requires
### Require 00: ExampleNftUriStorageContract-Workspace
You need a contract workspace like in the repository "ExampleNftUriStorageContract". Means you need initializes hardhat environment with the open-zeppelin library.

### Require 01: ExampleMetadataIpfsUpload-Workspace
You need a workspace to upload metadata to ipfs. I used pinata-cli (requires pinata account) to keep it simple for me at this point, but ther are also other ways to do it (for example directly connect to ipfs node). 

## Metadata creation
### Images
First you need to upload the images to ipfs because these are linked in the json file. So upload them and save the path. In my example:

>"image": "https://ipfs.io/ipfs/QmSCWjyAXFtBHC97KC1yNRUBoj17r4rpu9DsAhYGnFQLbE/ExampleMetadataImages/example_image_token0.png"

### JSON files
Create the metadata json files according to the metadata standards (see openzeppelin or opensea). Specially name, description and image should follow these standards.

IMPORTANT: The name of the file must be the Id as uint256, means the id zero is 64x "0".json:
>0000000000000000000000000000000000000000000000000000000000000000.json

In js you can create the string with the following command (also used in the test deployment script):

>let _paddedHex = (
>
>    "0000000000000000000000000000000000000000000000000000000000000000" + _id
>    
>  ).slice(-64);

I don't know yet if they are shown, but I also added the attributes section, to show that you can also implement values to catch them in your later application...and I thought it doesn't hurt if we follow the metadata standard here. 

>
>{
>
>    "name": "Example Token 0",
>
>    "description": "ERC1155 Example Metadata Token 0",
>
>    "image": "https://ipfs.io/ipfs/QmSCWjyAXFtBHC97KC1yNRUBoj17r4rpu9DsAhYGnFQLbE/ExampleMetadataImages/example_image_token0.png",
>
>    "attributes": [
>
>        {
>
>            "display_type": "boost_number", 
>
>            "trait_type": "Number shown as boost",
>
>            "value": 100
>
>        },
>
>        {
>
>            "display_type": "number", 
>
>            "trait_type": "Number shown as stats",
>
>            "value": 1
>
>             .......            
>
