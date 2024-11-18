#include<stdio.h>

int main()
{
	int i,j,trace=1,n=5;
	for(i=1;i<=n;i++){
		printf("\n");
		int k=trace;
		for(j=1;j<=i;j++){
			printf("%2d",k);
			k++;
		}
		trace=k;
	}
	
}