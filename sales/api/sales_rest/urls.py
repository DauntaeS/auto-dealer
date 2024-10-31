from django.urls import path

from .views import (
    api_list_salespeople,
    api_delete_salesperson,
    api_list_customer,
    api_delete_customer,
    api_list_sale,
    api_delete_sale,
    )

urlpatterns = [
    path(
        'salespeople/',
        api_list_salespeople,
        name='api_list_salespeople'
    ),
    path(
        'customers/',
        api_list_customer,
        name='api_list_customer'
    ),
    path(
        'sales/',
        api_list_sale,
        name='api_list_sale'
    ),
    path(
        'salespeople/<str:employee_id>/',
        api_delete_salesperson,
        name='api_delete_salesperson'
    ),
    path(
        'customers/<int:id>/',
        api_delete_customer,
        name='api_delete_customer'
    ),
    path(
        'sales/<int:id>/',
        api_delete_sale,
        name='api_delete_sale'
    ),
]
