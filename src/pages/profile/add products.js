import React, { useState } from 'react';
import axios from 'axios';


let AddProduct = ({currentUser}) => {

    let [name, setName] = useState('')
    let [company, setCompany] = useState('')
    let [description, setDescription] = useState('')
    let [price, setPrice] = useState(0)
    let [free_shipping, setFree_shipping] = useState(false)
    let [featured, setFeatured] = useState(false)
    let [color, setColor] = useState([])
    let [size, setSize] = useState([])
    let [discount, setDiscount] = useState(0)
    let [image, setImage] = useState()

    let [openColorModal, setOpenColorModal] = useState(false)
    let [openSizeModal, setOpenSizeModal] = useState(false)

    //set product color--------------------------------
    let setProductColor = (e) => {
        let productColor = e.target.placeholder

        if(e.target.checked === true) {
            setColor(color => [...color, productColor])
        }

        else if(!e.target.checked === true) {
            let colors = color.length === 0 ? color : color.filter(color => color !== productColor)
            setColor(colors)
        }
    }

    //set product color--------------------------------
    let setProductSize = (e) => {
        let productSize = e.target.placeholder

        if(e.target.checked === true) {
            setSize(size => [...size, productSize])
        }

        else if(!e.target.checked === true) {
            let sizes = size.length === 0 ? size : size.filter(size => size !== productSize)
            setSize(sizes)
        }
    }

    //set product featured-----------------
    let setProductFeatured = (e) => {
        let feature = e.target.placeholder === 'true' ? Boolean(e.target.placeholder) : false

        if(e.target.checked === true) {
            setFeatured(feature)
        }
        else if (!e.target.checked === true) {
            setFeatured(false)
        }
    }

    //set product free shipping-----------------
    let setProductFreeShipping = (e) => {
        let freeShipping = e.target.placeholder === 'true' ? Boolean(e.target.placeholder) : false

        if(e.target.checked === true) {
            setFree_shipping(freeShipping)
        }
        else if (!e.target.checked === true) {
            setFree_shipping(false)
        }
    }    

    //upload image------------------------------
    let uploadImage = async (e) => {

        let imageFile = e.target.files[0]

        let formData = new FormData()
        formData.append('image', imageFile)

        try {
            let { data : { image : { src } } } = await axios.post(`/apis/v2/products/uploadImage`, formData, {
                headers : { 'Content-Type' : 'multipart/form-data' }
            })

            setImage(src)
        } catch (error) {
            console.log(error)
        }
    }


    //submit product form-----------------------
    let addProduct = async (e) => {
        e.preventDefault()

        if (!name || !company || !description || !price || !image || !free_shipping 
            || !discount || !featured || !color || !size) {
            alert(`Please provide all the fields`)
        }

        try {
            let { data } = await axios.post(`apis/v2/products`, { name,company,price,description,image,free_shipping,
            discount, featured,color,size })
            console.log(data)

            alert('Product added successfully')
            setName('')
            setCompany('')
            setDescription('')
            setPrice(0)
            setImage()
            setFree_shipping(false)
            setDiscount(0)
            setSize([])
            setFeatured(false)
            setColor([])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`${currentUser.role === 'admin' ? 'add_products_div' : 'add_products_div hide'}`}>
            <p style={{fontSize:'17px'}}>Add Products</p>
            <form onSubmit={addProduct}>
                <div>
                    <p>Name</p>
                    <span>
                        <input type="text" placeholder="shoe" value={name} onChange={e => setName(e.target.value)} />
                    </span>
                </div>
                <div>
                    <p>Company</p>
                    <span>
                        <input type="text" placeholder="nike" value={company} onChange={e => setCompany(e.target.value)} />
                    </span>
                </div>
                <div>
                    <p>Price</p> 
                    <span>
                        <input type="number" placeholder="1000" value={price} onChange={e => setPrice(e.target.value)} />
                    </span>
                </div>
                <div>
                    <p>Description</p>
                    <span>
                        <input type="text" id="description_input"
                        placeholder="valid information about the product" value={description} onChange={e => setDescription(e.target.value)} />
                    </span>
                </div>
                <div>
                    <p>Image</p>
                    <span>
                        <input type="file" accept='image/*' className='image_input' onChange={uploadImage} />
                        <span className={`${image ? 'image_span show' : 'image_span'}`}>
                            <img src={image} alt="sorry" />
                        </span>
                    </span>
                </div>
                <div>
                    <p>Color</p>
                    <span>
                        <p className='select_p' onClick={() => setOpenColorModal(boolean => !boolean)}>Select</p>
                        <span className={`${openColorModal ? 'color_span show' : 'color_span'}`}>
                            <span>
                                <p style={{padding:'10px', borderRadius:'50%', background:'red'}}></p>
                                <input type='checkbox' placeholder='red' onChange={setProductColor} />
                            </span>
                            <span>
                                <p style={{padding:'10px', borderRadius:'50%', background:'black'}}></p>
                                <input type='checkbox' placeholder='black'  onChange={setProductColor} />
                            </span>
                            <span>
                                <p style={{padding:'10px', borderRadius:'50%', background:'yellow'}}></p>
                                <input type='checkbox' placeholder='yellow'  onChange={setProductColor} />
                            </span>
                            <span>
                                <p style={{padding:'10px', borderRadius:'50%', background:'white'}}></p>
                                <input type='checkbox' placeholder='white'  onChange={setProductColor} />
                            </span>
                            <span>
                                <p style={{padding:'10px', borderRadius:'50%', background:'blue'}}></p>
                                <input type='checkbox' placeholder='blue'  onChange={setProductColor} />
                            </span>
                            <span>
                                <p style={{padding:'10px', borderRadius:'50%', background:'gray'}}></p>
                                <input type='checkbox' placeholder='gray'  onChange={setProductColor} />
                            </span>
                        </span>
                    </span>
                </div>
                <div>
                    <p>Size</p>
                    <span>
                        <p className='select_p' onClick={() => setOpenSizeModal(boolean => !boolean)}>Select</p>
                        <span className={`${openSizeModal ? 'size_span show' : 'size_span'}`}>
                            <span>
                                <p>XS</p>
                                <input type='checkbox' placeholder='XS' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>S</p>
                                <input type='checkbox' placeholder='S' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>M</p>
                                <input type='checkbox' placeholder='M' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>L</p>
                                <input type='checkbox' placeholder='L' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>XL</p>
                                <input type='checkbox' placeholder='XL' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>XXL</p>
                                <input type='checkbox' placeholder='XXL' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>6</p>
                                <input type='checkbox' placeholder='6' onChange={setProductSize} />
                            </span>   
                            <span>
                                <p>7</p>
                                <input type='checkbox' placeholder='7' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>8</p>
                                <input type='checkbox' placeholder='8' onChange={setProductSize} />
                            </span>
                            <span>
                                <p>9</p>
                                <input type='checkbox' placeholder='9' onChange={setProductSize} />
                            </span>                                                                                                             
                        </span>
                    </span>
                </div>
                <div>
                    <p>Featured</p>
                    <span>
                        <input type="checkbox" placeholder='true' className='radio_input' value={featured} onChange={setProductFeatured} />
                        <label htmlFor='true'>True</label>
                        <input type="checkbox" placeholder='false' className='radio_input' value={featured} onChange={setProductFeatured} />
                        <label htmlFor='false'>False</label>
                    </span>
                </div>
                <div>
                    <p>Free Shipping</p>
                    <span>
                        <input type="checkbox" className='radio_input' placeholder='true' value={free_shipping} onChange={setProductFreeShipping} /> 
                        <label htmlFor='true'>True</label>
                        <input type="checkbox" className='radio_input' placeholder='false' value={free_shipping} onChange={setProductFreeShipping} />
                        <label htmlFor='false'>False</label> 
                    </span>    
                </div>
                <div>
                    <p>Discount</p>
                    <span>
                        <input type="number" placeholder="10" value={discount} onChange={e => setDiscount(e.target.value)} />
                    </span>
                </div>
                <div>
                    <button>ADD PRODUCT</button>
                </div>
            </form>
        </div>
    )
}



export default AddProduct