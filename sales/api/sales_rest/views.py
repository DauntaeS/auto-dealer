from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import AutomobileVO, Salesperson, Customer, Sale

from .encoders import (
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


@require_http_methods(['GET', 'POST'])
def api_list_salespeople(request):
    if request.method == 'GET':
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {'salespersons': salespersons},
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(['DELETE'])
def api_delete_salesperson(request, employee_id):
    if request.method == 'DELETE':
        try:
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {'message': 'Salesperson not found!'},
                status=404
            )


@require_http_methods(['GET', 'POST'])
def api_list_customer(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(['DELETE'])
def api_delete_customer(request, id):
    if request.method == 'DELETE':
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {'message': 'Customer not found!'},
                status=404,
            )


@require_http_methods(['GET', 'POST'])
def api_list_sale(request):
    if request.method == 'GET':
        sales_list = Sale.objects.all()
        return JsonResponse(
            {'sales_list': sales_list},
            encoder=SaleEncoder,
        )
    else:
        new_content = {}
        content = json.loads(request.body)

        try:
            vin = content['vin']
            automobile = AutomobileVO.objects.get(vin=vin)
            if automobile.sold is False:
                AutomobileVO.objects.filter(vin=vin).update(sold=True)
                new_content['automobile'] = automobile
            else:
                return JsonResponse(
                    {'message': 'Automobile has been sold'},
                    status=400,
                )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid VIN'},
                status=404,
            )
        try:
            address_entry = content['address_entry']
            customer = Customer.objects.get(address=address_entry)
            new_content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid Address'},
                status=404,
            )
        try:
            employee_id_entry = content['employee_id_entry']
            salesperson = Salesperson.objects.get(employee_id=employee_id_entry)
            new_content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid Employee ID'},
                status=404,
            )
        price = content['price']
        new_content['price'] = price
        sale = Sale.objects.create(**new_content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(['DELETE'])
def api_delete_sale(request, id):
    if request.method == 'DELETE':
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {'messsage': 'Sale not found!'},
                status=404,
            )
