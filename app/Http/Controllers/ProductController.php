<?php

namespace App\Http\Controllers;

use App\Classes\ActionResponseMessage;
use App\Classes\SingleResponseMessage;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAdditional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Nette\Utils\Image;

class ProductController extends Controller
{
    public function getListProduct()
    {
        return response()->json(
            Product::all()
        );
    }

    public function getProduct(Request $request)
    {
        $productInfoResponse = new SingleResponseMessage();
        try {
            $productInfoRequest = $request->all();
            $productId = $productInfoRequest['productId'];
            $userId = $productInfoRequest['userId'];
            $productInfo = Product::where('Id', $productId)->first();
            if ($userId != null) {
                $cartProductUser = Cart::where('ProductId', $productId)->where('UserId', $userId)->first();
                if ($cartProductUser != null) {
                    $productInfo->Quantity -= $cartProductUser->BuyQuantity;
                }
            }
            $productInfoResponse->setItem($productInfo);
            $productInfoResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $productInfoResponse->setIsSuccess(false);
            $productInfoResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($productInfoResponse);
    }

    public function getListOutstandingProduct()
    {
        return response()->json(Product::where('IsOutstanding', 1)->get());
    }

    public function getSearchListProduct(Request $request) {
        $keyword = $request->query('keyword');
        return response()->json(Product::where('Name', 'like', '%'.$keyword.'%')->get());
    }

    public function insertProduct(Request $request) {
        $insertProductResponse = new ActionResponseMessage();
        try {
            $newProduct = new Product();
            $newProduct->Name = $request->name;
            $newProduct->Specification = $request->specification;
            $newProduct->Unit =$request->unit;
            $newProduct->BrandId = $request->brand;
            $newProduct->CategoryId = $request->category;
            $newProduct->ImportPrice = $request->importPrice;
            $newProduct->Price = $request->price;
            $newProduct->Quantity = $request->quantity;
            $newProduct->ObjectId = $request->object;
            $newProduct->Status = 1;
            if ($request->has('imageAvatar')) {
                $imageAvatarFile = $request->file('imageAvatar');
                $imageAvatarFileName = $imageAvatarFile->getClientOriginalName();
                $imageAvatarFile->storeAs('images/product', $imageAvatarFileName, ['disk'=>'public_path']);
                $newProduct->ImageAvatarUrl = '/images/product/'.$imageAvatarFileName;
            }
            $newProduct->save();
            $listAdditionalInfo = json_decode($request->listAdditionInfo);
            foreach ($listAdditionalInfo as $additionalInfo) {
                $newProductAdditional = new ProductAdditional();
                $newProductAdditional->ProductId = Product::all()->last()->Id;
                $newProductAdditional->TitleInfo = $additionalInfo->titleInfo;
                $newProductAdditional->Content = $additionalInfo->content;
                $newProductAdditional->save();
            }
            $insertProductResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $insertProductResponse->setIsSuccess(false);
            $insertProductResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($insertProductResponse);
    }

    public function deleteProduct(Request $request) {
        $deleteProductResponse = new ActionResponseMessage();
        try {
            $productId = $request->productId;
            DB::table('product')->where('id', $productId)->delete();
            $deleteProductResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $deleteProductResponse->setIsSuccess(false);
            $deleteProductResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($deleteProductResponse);
    }

    public function editProduct(Request $request) {
        $editProductResponse = new ActionResponseMessage();
        
        try {
            $editProductRequest = $request;
            $productId = $editProductRequest['productId'];
            Product::where('Id', $productId)->update([
            'Name'=> $request->name,
            'Specification' => $request->specification,
            'Unit' => $request->unit,
            'BrandId' => $request->brand,
            'CategoryId' => $request->category,
            'ImportPrice' => $request->importPrice,
            'Price' => $request->price,
            'Quantity' => $request->quantity,
            'ObjectId' => $request->object,
            'Status' => 1,
            ]);
            if ($request->has('imageAvatar')) {
                $imageAvatarFile = $request->file('imageAvatar');
                $imageAvatarFileName = $imageAvatarFile->getClientOriginalName();
                $imageAvatarFile->storeAs('images/product', $imageAvatarFileName, ['disk'=>'public_path']);
                Product::where('Id', $productId)->update([
                    'ImageAvatarUrl' => '/images/product/'.$imageAvatarFileName
                ]);
            }
            $editProductResponse->setIsSuccess(true);
        } catch (\Exception $ex) {
            $editProductResponse->setIsSuccess(false);
            $editProductResponse->setErrorMessage($ex->getMessage());
        }
        return response()->json($editProductResponse);
    }
}
