import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFilter,
  getAllCategory,
} from "../../reduxSlicers/categorySlicer";
import { getAllType, typeFilter } from "../../reduxSlicers/typeSlicer";
import { getAllSize, sizeFilter } from "../../reduxSlicers/sizeSlicer";
import { brandFilter, getAllBrand } from "../../reduxSlicers/brandSlicer";
import { getAllProduct } from "../../reduxSlicers/ProductSlicer";

const FilterSide = () => {
  const [showType, setShowType] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showSize, setShowSize] = useState(true);
  const [showBrand, setShowBrand] = useState(true);

  const [queryList, setQueryList] = useState({
    size: [],
    type: [],
    category: [],
    brand: [],
  });
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.category.category);
  const allType = useSelector((state) => state.type.type);
  const allSize = useSelector((state) => state.size.size);
  const allBrand = useSelector((state) => state.brand.brand);

  const sizeQuery = useSelector((state) => state.size.sizeQuery);
  const typeQuery = useSelector((state) => state.type.typeQuery);
  const categoryQuery = useSelector((state) => state.category.categoryQuery);
  const brandQuery = useSelector((state) => state.brand.brandQuery);

  const typeError = useSelector((state) => state.type.error);

  const sizeError = useSelector((state) => state.size.error);

  useEffect(() => {
    const filters = {
      size: sizeQuery,
      type: typeQuery,
      brand: brandQuery,
      category: categoryQuery,
    };

    dispatch(getAllProduct(filters));
  }, [sizeQuery, typeQuery, categoryQuery, brandQuery]);

  const handleFilterSize = (e) => {
    dispatch(sizeFilter(e.target.value));
  };

  const handleFilterType = (e) => {
    dispatch(typeFilter(e.target.value));
  };

  const handleFilterBrand = (e) => {
    dispatch(brandFilter(e.target.value));
  };

  const handleFilterCategory = (e) => {
    dispatch(categoryFilter(e.target.value));
  };
  const handleShowFilterSide = (e) => {
    console.log(e.parent);
  };
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllType());
    dispatch(getAllSize());
    dispatch(getAllBrand());
  }, []);
  return (
    <div className="flex flex-col w-full   ">
   
      {/* TYPE  */}
      <div className="flex flex-col  py-6 border-b   gap-3">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold">Type</h2>

          {showType ? (
            <FaPlus
              onClick={() => setShowType(!showType)}
              className="cursor-pointer"
            />
          ) : (
            <FaMinus
              onClick={() => setShowType(!showType)}
              className="cursor-pointer"
            />
          )}
        </div>
        {showType && (
          <div className="flex flex-col flex-wrap max-md:flex-row ">
            {allType &&
              allType.map((type, index) => (
                <div
                  key={index}
                  className="p-1 flex  justify-start items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={type._id}
                    checked={typeQuery.includes(type._id)}
                    value={type._id}
                    onChange={(e) => handleFilterType(e)}
                  />
                  <label htmlFor={type._id}>{type.name}</label>
                </div>
              ))}
          </div>
        )}
      </div>
      {/* Category  */}
      <div className="flex flex-col  py-6 border-b p gap-3">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold">Category</h2>

          {showCategory ? (
            <FaPlus
              onClick={() => setShowCategory(!showCategory)}
              className="cursor-pointer"
            />
          ) : (
            <FaMinus
              onClick={() => setShowCategory(!showCategory)}
              className="cursor-pointer"
            />
          )}
        </div>
        {showCategory && (
          <div className="flex flex-col flex-wrap max-md:flex-row ">
            {allCategory &&
              allCategory.map((category, index) => (
                <div
                  key={index}
                  className="p-1 flex justify-start items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={category._id}
                    value={category._id}
                    checked={categoryQuery.includes(category._id)}
                    onChange={(e) => handleFilterCategory(e)}
                  />
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Size  */}
      <div className="flex flex-col  py-6 border-b p gap-3">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold">Size</h2>

          {showSize ? <FaPlus     onClick={() => setShowSize(!showSize)}
              className="cursor-pointer" /> : <FaMinus 
                   onClick={() => setShowSize(!showSize)}
              className="cursor-pointer"
              />}
        </div>
        {
          showSize &&
              <div className="flex flex-col flex-wrap max-md:flex-row ">
          {allSize &&
            allSize.map((size, index) => (
              <div
                key={index}
                className="p-1 flex justify-start items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={size._id}
                  checked={sizeQuery.includes(size._id)}
                  value={size._id}
                  onChange={(e) => handleFilterSize(e)}
                />
                <label htmlFor={size._id}>{size.name}</label>
              </div>
            ))}
        </div>
        }
    
      </div>

      {/* Brand  */}
        
      <div className="flex flex-col  py-6 border-b p gap-3">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold">Brand</h2>
          {
            showBrand ?
            <FaPlus onClick={() => setShowBrand(!showBrand)}
            className="cursor-pointer" />:
            <FaMinus  onClick={() => setShowBrand(!showBrand)}
            className="cursor-pointer" />

          }
        </div>
{
  showBrand &&
  <div className="flex flex-col flex-wrap max-md:flex-row ">
          {allBrand &&
            allBrand.map((brand, index) => (
              <div
                key={index}
                className="p-1 flex justify-start items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={brand._id}
                  checked={brandQuery.includes(brand._id)}
                  value={brand._id}
                  onChange={(e) => handleFilterBrand(e)}
                />
                <label htmlFor={brand._id}>{brand.name}</label>
              </div>
            ))}
        </div>
}
        
      </div>
    </div>
  );
};

export default FilterSide;
