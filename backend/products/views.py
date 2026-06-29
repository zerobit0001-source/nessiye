from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class IsShop:
    @staticmethod
    def check(user):
        return user.is_authenticated and user.is_shop
    

class ProductListCreateView(APIView):
    """This class for get and post products from shops"""
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    # parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        barcode = request.query_params.get('barcode')
    
        if request.user.is_authenticated and request.user.is_shop:
            products = Product.objects.filter(shop=request.user)
        else:
            products = Product.objects.all()
    
        if barcode:
            product = products.filter(barcode=barcode).first()
            if not product:
                return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
            serializer = ProductSerializer(product)
            return Response({"ok": True, "product": serializer.data})
    
        serializer = ProductSerializer(products, many=True)
        return Response({"ok": True, "products": serializer.data})

    def post(self, request):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'فقط فروشگاه‌ها می‌توانند محصول اضافه کنند'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(shop=request.user)

        return Response({'ok': True, 'message': 'محصول با موفقیت اضافه شد', 'product': serializer.data}, status=status.HTTP_201_CREATED)
    

class ProductDetailView(APIView):
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    # parser_classes = [MultiPartParser, FormParser]

    def get_object(self, pk, user=None):
        try:
            product = Product.objects.get(pk=pk)
            return product
        except Product.DoesNotExist:
            return None
        
    def get(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product)
        return Response({'ok': True, 'product': serializer.data}, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'فقط فروشگاه‌ها می‌توانند محصول را ویرایش کنند'}, status=status.HTTP_403_FORBIDDEN)
        
        product = self.get_object(pk)
        if not product:
            return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
        
        if product.shop != request.user:
            return Response({'ok': False, 'message': 'شما اجازه ویرایش این محصول را ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = ProductSerializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'ok': True, 'message': 'محصول با موفقیت ویرایش شد', 'product': serializer.data}, status=status.HTTP_200_OK)
    
    def delete(self, request, pk):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'فقط فروشگاه‌ها می‌توانند محصول را حذف کنند'}, status=status.HTTP_403_FORBIDDEN)
        
        product = self.get_object(pk)
        if not product:
            return Response({'ok': False, 'message': 'محصول یافت نشد'}, status=status.HTTP_404_NOT_FOUND)
        
        if product.shop != request.user:
            return Response({'ok': False, 'message': 'شما اجازه حذف این محصول را ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        product.delete()
        return Response({'ok': True, 'message': 'محصول با موفقیت حذف شد'}, status=status.HTTP_200_OK)
    

class CategoryListCreateView(APIView):
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({'ok': True, 'categories': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        if not IsShop.check(request.user):
            return Response({'ok': False, 'message': 'دسترسی ندارید'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'ok': True, 'message': 'دسته‌بندی با موفقیت اضافه شد', 'category': serializer.data}, status=status.HTTP_201_CREATED)