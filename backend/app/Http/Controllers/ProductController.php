<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $get_product = Product::all();

       if($get_product->count() > 0){
        return response()->json($get_product);
       }else{
        return response()->json([
            'message'=>'No available product found'
        ]);
       }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $fileds = $request->validate([
        'product_name'=>'required | max:255',
        'product_type'=> 'max:255',
        'price' => 'required',
        'supplier'=> 'required | unique:product',
        'weight'=> 'required | max:255'
       ]);

       $create_product = Product::create($fileds);

       if($create_product){
        return response()->json([
            'message'=>'Product Created successfully'
        ]);
       }
       return response()->json([
        'message'=>'somthing went error'
       ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        if($product->count() > 0){
            return response()->json($product);
        }
        return response()->json(['messsage' => 'not product found']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $delete_product = $product->delete();

        if($delete_product){
            return response()->json(['message'=> 'product deleted successfully']);
            
        }
    }
}
